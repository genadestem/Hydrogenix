import { useState, useEffect, useCallback, useRef } from 'react';
import { getSensorSnapshot, subscribeMqttStatus, getMqttStatusSnapshot, type MqttSensorSnapshot } from '../services/mqtt';

export interface SensorData {
  id?: number;
  device_id: string;
  temperature: number;
  humidity: number;
  soil_moisture: number;
  rain?: number | null;
  score?: number | null;
  soil_score?: number | null;
  vdp_score?: number | null;
  rain_score?: number | null;
  vpd?: number | null;
  duration_estimate?: number | null;
  pump_status: boolean;
  watering_active?: boolean | null;
  led_status?: boolean;
  device_mode?: 'manual' | 'auto' | null;
  plant_phase?: 'vegetatif' | 'generatif' | null;
  wifi_status: string;
  threshold_kritis?: number | null;
  threshold_atas?: number | null;
  threshold_bawah?: number | null;
  watering_time?: string | null;
  watering_duration?: number | null;
  auto_state?: string | null;
  auto_reason?: string | null;
  schedule_enabled?: boolean;
  formula_name?: string | null;
  formula_soil?: string | null;
  formula_vpd?: string | null;
  formula_score?: string | null;
  soil_raw_dry?: number | null;
  created_at: string;
}

function toNumber(value: unknown, fallback: number | null | undefined = null): number | null {
  const n = typeof value === 'string' ? Number(value.replace(',', '.')) : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function toBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'on', 'yes'].includes(normalized)) return true;
    if (['false', '0', 'off', 'no'].includes(normalized)) return false;
  }
  return fallback;
}

function buildFallbackData(): SensorData {
  return {
    device_id: 'ESP32_001',
    temperature: 0,
    humidity: 0,
    soil_moisture: 0,
    rain: 0,
    score: 0,
    soil_score: 0,
    vdp_score: 0,
    rain_score: 0,
    vpd: 0,
    duration_estimate: 0,
    pump_status: false,
    watering_active: false,
    led_status: false,
    device_mode: null,
    wifi_status: 'unknown',
    threshold_kritis: null,
    threshold_atas: null,
    threshold_bawah: null,
    watering_time: null,
    watering_duration: null,
    auto_state: null,
    auto_reason: null,
    schedule_enabled: true,
    formula_name: null,
    formula_soil: null,
    formula_vpd: null,
    formula_score: null,
    soil_raw_dry: null,
    created_at: new Date().toISOString(),
  };
}

function normalizeSensorDataRow(row: Record<string, unknown> | null | undefined): SensorData | null {
  if (!row || typeof row !== 'object') return null;
  const fallback = buildFallbackData();
  const value = row as Record<string, unknown>;

  return {
    id: typeof value.id === 'number' ? value.id : undefined,
    device_id: (value.device_id as string | undefined) ?? fallback.device_id,
    temperature: (toNumber(value.temperature, fallback.temperature) ?? fallback.temperature) as number,
    humidity: (toNumber(value.humidity, fallback.humidity) ?? fallback.humidity) as number,
    soil_moisture: (toNumber(value.soil_moisture ?? value.soil ?? value.tanah, fallback.soil_moisture) ?? fallback.soil_moisture) as number,
    rain: toNumber(value.rain ?? value.hujan, fallback.rain),
    score: toNumber(value.score ?? value.score_total ?? value.skor, fallback.score),
    soil_score: toNumber(value.soil_score ?? value.skor_tanah, fallback.soil_score),
    vdp_score: toNumber(value.vdp_score ?? value.skor_vdp, fallback.vdp_score),
    rain_score: toNumber(value.rain_score ?? value.skor_hujan, fallback.rain_score),
    vpd: toNumber(value.vpd, fallback.vpd),
    duration_estimate: toNumber(value.duration_estimate ?? value.duration ?? value.durasi, fallback.duration_estimate),
    pump_status: toBoolean(value.pump_status, fallback.pump_status),
    led_status: toBoolean(value.led_status ?? value.feeder_status, fallback.led_status),
    device_mode: value.device_mode === 'auto' || value.device_mode === 'manual' ? (value.device_mode as 'auto' | 'manual') : null,
    wifi_status: (value.wifi_status as string | undefined) ?? fallback.wifi_status,
    threshold_kritis: toNumber(value.threshold_kritis, fallback.threshold_kritis),
    threshold_atas: toNumber(value.threshold_atas, fallback.threshold_atas),
    threshold_bawah: toNumber(value.threshold_bawah, fallback.threshold_bawah),
    watering_time: typeof value.watering_time === 'string' ? value.watering_time : null,
    watering_duration: toNumber(value.watering_duration, fallback.watering_duration),
    watering_active: toBoolean(value.watering_active, fallback.watering_active ?? false),
    auto_state: typeof value.auto_state === 'string' ? value.auto_state : null,
    auto_reason: typeof value.auto_reason === 'string' ? value.auto_reason : null,
    schedule_enabled: toBoolean(value.schedule_enabled, fallback.schedule_enabled),
    formula_name: typeof value.formula_name === 'string' ? value.formula_name : null,
    formula_soil: typeof value.formula_soil === 'string' ? value.formula_soil : null,
    formula_vpd: typeof value.formula_vpd === 'string' ? value.formula_vpd : null,
    formula_score: typeof value.formula_score === 'string' ? value.formula_score : null,
    soil_raw_dry: toNumber(value.soil_raw_dry, fallback.soil_raw_dry),
    plant_phase: value.plant_phase === 'generatif' || value.plant_phase === 'vegetatif' ? (value.plant_phase as 'generatif' | 'vegetatif') : null,
    created_at: (value.created_at as string | undefined) ?? new Date().toISOString(),
  };
}

function mergeSensorData(base: SensorData | null, live: MqttSensorSnapshot | null): SensorData | null {
  if (!base && !live) return null;
  const fallback = base ?? buildFallbackData();

  return {
    ...fallback,
    device_id: live?.device_id ?? fallback.device_id,
    temperature: live?.temperature ?? fallback.temperature,
    humidity: live?.humidity ?? fallback.humidity,
    soil_moisture: live?.soil_moisture ?? fallback.soil_moisture,
    rain: live?.rain ?? fallback.rain,
    score: live?.score ?? fallback.score,
    soil_score: live?.soil_score ?? fallback.soil_score,
    vdp_score: live?.vdp_score ?? fallback.vdp_score,
    rain_score: live?.rain_score ?? fallback.rain_score,
    vpd: live?.vpd ?? fallback.vpd,
    duration_estimate: live?.duration_estimate ?? fallback.duration_estimate,
    pump_status: live?.pump_status ?? fallback.pump_status,
    led_status: live?.led_status ?? fallback.led_status,
    device_mode: live?.device_mode ?? fallback.device_mode,
    wifi_status: live?.wifi_status ?? fallback.wifi_status,
    threshold_kritis: live?.threshold_kritis ?? fallback.threshold_kritis,
    threshold_atas: live?.threshold_atas ?? fallback.threshold_atas,
    threshold_bawah: live?.threshold_bawah ?? fallback.threshold_bawah,
    watering_time: live?.watering_time ?? fallback.watering_time,
    watering_duration: live?.watering_duration ?? fallback.watering_duration,
    watering_active: live?.watering_active ?? fallback.watering_active,
    auto_state: live?.auto_state ?? fallback.auto_state,
    auto_reason: live?.auto_reason ?? fallback.auto_reason,
    schedule_enabled: live?.schedule_enabled ?? fallback.schedule_enabled,
    formula_name: live?.formula_name ?? fallback.formula_name,
    formula_soil: live?.formula_soil ?? fallback.formula_soil,
    formula_vpd: live?.formula_vpd ?? fallback.formula_vpd,
    formula_score: live?.formula_score ?? fallback.formula_score,
    soil_raw_dry: live?.soil_raw_dry ?? fallback.soil_raw_dry,
    plant_phase: live?.plant_phase ?? fallback.plant_phase,
    created_at: live?.updatedAt ?? fallback.created_at,
  };
}

// Saat inisialisasi, kita asumsikan fallback DB yang akan me-refresh
const getInitialSensorData = () => {
  const isOnline = getMqttStatusSnapshot().mqttConnected;
  return mergeSensorData(null, isOnline ? getSensorSnapshot() : null);
};

export function useSensorData(pollInterval = 1000) {
  const [data, setData] = useState<SensorData | null>(getInitialSensorData);
  const [history, setHistory] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const lastDataRef = useRef<SensorData | null>(getInitialSensorData());

  const mergeWithLiveSnapshot = useCallback((next: SensorData | null) => {
    const isOnline = getMqttStatusSnapshot().mqttConnected;
    const live = isOnline ? getSensorSnapshot() : null;
    return mergeSensorData(next ?? lastDataRef.current, live);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [latestRes, historyRes] = await Promise.all([
        fetch('/api/sensor?latest=true'),
        fetch('/api/sensor?limit=60'),
      ]);

      if (!latestRes.ok || !historyRes.ok) {
        throw new Error('Failed to fetch sensor data');
      }

      const latest = await latestRes.json().catch(() => null);
      const historyData = await historyRes.json().catch(() => []);

      const normalizedLatest = normalizeSensorDataRow(latest);
      const mergedLatest = mergeWithLiveSnapshot(normalizedLatest);
      if (mergedLatest) {
        lastDataRef.current = mergedLatest;
        setData(mergedLatest);
      }

      setHistory(Array.isArray(historyData) ? historyData.map(normalizeSensorDataRow).filter(Boolean) as SensorData[] : []);
      setError(null);
    } catch (err) {
      const fallback = mergeWithLiveSnapshot(lastDataRef.current);
      if (fallback) {
        lastDataRef.current = fallback;
        setData(fallback);
      }
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [mergeWithLiveSnapshot]);

  useEffect(() => {
    const run = () => {
      void fetchData();
    };

    const timeoutId = window.setTimeout(run, 0);
    const interval = window.setInterval(run, pollInterval);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(interval);
    };
  }, [fetchData, pollInterval]);

  useEffect(() => {
    const unsubscribe = subscribeMqttStatus(() => {
      const live = getSensorSnapshot();
      if (!live) return;
      setData((prev) => {
        const merged = mergeSensorData(prev ?? lastDataRef.current, live);
        if (merged) lastDataRef.current = merged;
        return merged;
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { data, history, loading, error, refetch: fetchData };
}
