'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ============ WGS84 转 GCJ-02 坐标转换 ============
const PI = Math.PI;
const A = 6378245.0;
const EE = 0.00669342162296594323;

function outOfChina(lng: number, lat: number): boolean {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

function transformLat(x: number, y: number): number {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((y / 12.0) * PI) + 320.0 * Math.sin((y * PI) / 30.0)) * 2.0) / 3.0;
  return ret;
}

function transformLng(x: number, y: number): number {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) * 2.0) / 3.0;
  return ret;
}

// WGS84 转 GCJ-02
function wgs84ToGcj02(lng: number, lat: number): [number, number] {
  if (outOfChina(lng, lat)) {
    return [lng, lat];
  }
  
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  
  const radLat = (lat / 180.0) * PI;
  let magic = Math.sin(radLat);
  magic = 1 - EE * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  
  dLat = (dLat * 180.0) / ((A * (1 - EE)) / (magic * sqrtMagic) * PI);
  dLng = (dLng * 180.0) / (A / sqrtMagic * Math.cos(radLat) * PI);
  
  const mgLat = lat + dLat;
  const mgLng = lng + dLng;
  
  return [mgLng, mgLat];
}

// ============ 地图标记图标 ============
const iconDefault = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #E91E63 0%, #F06292 100%);
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 3px solid white;
    box-shadow: 0 3px 10px rgba(233,30,99,0.4);
  "></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const iconGuardian = L.divIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 3px 10px rgba(59,130,246,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  ">🧑</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// ============ 接口定义 ============
interface Location {
  lat: number;
  lng: number;
  timestamp?: string;
  status?: string;
}

interface ServiceMapProps {
  serviceLocation: Location;
  guardianLocation?: Location;
  trajectory?: Location[];
  address?: string;
}

export function ServiceMap({
  serviceLocation,
  guardianLocation,
  trajectory = [],
  address = '服务地点',
}: ServiceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const isMountedRef = useRef(true);

  // 使用 useMemo 缓存转换后的坐标，避免每次渲染重新计算
  const convertedServiceLocation = useMemo(() => {
    const [lng, lat] = wgs84ToGcj02(serviceLocation.lng, serviceLocation.lat);
    return { lat, lng };
  }, [serviceLocation.lat, serviceLocation.lng]);

  const convertedTrajectory = useMemo(() => {
    return trajectory.map(point => {
      const [lng, lat] = wgs84ToGcj02(point.lng, point.lat);
      return { lat, lng };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trajectory.map(p => `${p.lat},${p.lng}`).join('|')]);

  const convertedGuardian = useMemo(() => {
    if (!guardianLocation) return null;
    const [lng, lat] = wgs84ToGcj02(guardianLocation.lng, guardianLocation.lat);
    return { lat, lng };
  }, [guardianLocation?.lat, guardianLocation?.lng]);

  // 安全地清除图层
  const clearMarkers = useCallback(() => {
    if (markersLayerRef.current) {
      try {
        markersLayerRef.current.clearLayers();
      } catch (e) {
        // 忽略清除错误
      }
    }
  }, []);

  // 初始化地图
  useEffect(() => {
    isMountedRef.current = true;
    
    if (!mapRef.current || mapInstanceRef.current) return;

    // 延迟初始化，确保DOM已完全挂载
    const initTimer = setTimeout(() => {
      if (!isMountedRef.current || !mapRef.current || mapInstanceRef.current) return;

      try {
        const map = L.map(mapRef.current, {
          center: [convertedServiceLocation.lat, convertedServiceLocation.lng],
          zoom: 16,
          zoomControl: false,
          attributionControl: false,
        });

        // 使用高德地图瓦片（GCJ-02坐标系）
        L.tileLayer(
          'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          {
            subdomains: ['1', '2', '3', '4'],
            maxZoom: 18,
          }
        ).addTo(map);

        // 添加缩放控件到右下角
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // 创建图层组用于管理标记
        markersLayerRef.current = L.layerGroup().addTo(map);

        mapInstanceRef.current = map;
        
        if (isMountedRef.current) {
          setIsMapReady(true);
        }
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    }, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimer);
      
      // 安全销毁地图
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          // 忽略销毁错误
        }
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
      }
      
      if (isMountedRef.current) {
        setIsMapReady(false);
      }
    };
  }, [convertedServiceLocation]);

  // 添加标记和轨迹
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    
    if (!map || !markersLayer || !isMapReady || !isMountedRef.current) return;

    // 清除之前的标记
    clearMarkers();

    try {
      // 绘制轨迹线
      if (convertedTrajectory.length > 1) {
        const latLngs = convertedTrajectory.map((point) => [point.lat, point.lng] as L.LatLngExpression);
        L.polyline(latLngs, {
          color: '#3B82F6',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 10',
        }).addTo(markersLayer);
      }

      // 添加服务地点标记
      const serviceMarker = L.marker([convertedServiceLocation.lat, convertedServiceLocation.lng], {
        icon: iconDefault,
      }).addTo(markersLayer);

      serviceMarker.bindPopup(`
        <div style="padding: 10px; min-width: 180px;">
          <div style="font-weight: bold; color: #E91E63; margin-bottom: 6px; font-size: 14px;">📍 服务地点</div>
          <div style="font-size: 13px; color: #333; line-height: 1.4;">${address}</div>
        </div>
      `);

      // 添加守护人位置标记
      if (convertedGuardian) {
        const guardianMarker = L.marker([convertedGuardian.lat, convertedGuardian.lng], {
          icon: iconGuardian,
        }).addTo(markersLayer);

        guardianMarker.bindPopup(`
          <div style="padding: 10px; min-width: 140px;">
            <div style="font-weight: bold; color: #3B82F6; margin-bottom: 6px; font-size: 14px;">守护人位置</div>
            <div style="font-size: 13px; color: #333;">正在前往服务地点</div>
          </div>
        `);
      }

      // 调整视图以包含所有标记
      const bounds = L.latLngBounds([[convertedServiceLocation.lat, convertedServiceLocation.lng]]);
      if (convertedGuardian) {
        bounds.extend([convertedGuardian.lat, convertedGuardian.lng]);
      }
      convertedTrajectory.forEach((point) => {
        bounds.extend([point.lat, point.lng]);
      });

      if (bounds.isValid() && mapInstanceRef.current) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 17 });
      }
    } catch (error) {
      console.error('Error adding markers:', error);
    }
  }, [convertedServiceLocation, convertedGuardian, convertedTrajectory, address, isMapReady, clearMarkers]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {!isMapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-gray-500">地图加载中...</p>
          </div>
        </div>
      )}
    </div>
  );
}
