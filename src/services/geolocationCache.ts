/**
 * Geolocation Cache Service
 * Manages caching of location data with TTL (Time To Live)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationData } from '../hooks/useGeolocation';

const CACHE_KEY = '@c_one:geolocation_cache';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

interface CachedLocationData {
  location: LocationData;
  timestamp: number; // Timestamp de la mise en cache
  ttl: number; // Time To Live en millisecondes
}

/**
 * Vérifie si les données en cache sont encore valides
 */
const isCacheValid = (cachedData: CachedLocationData): boolean => {
  const now = Date.now();
  const age = now - cachedData.timestamp;
  return age < cachedData.ttl;
};

/**
 * Sauvegarde la localisation dans le cache
 * @param location - Données de localisation à sauvegarder
 * @param ttl - Durée de vie du cache en millisecondes (défaut: 24h)
 */
export const saveLocationCache = async (
  location: LocationData,
  ttl: number = DEFAULT_TTL
): Promise<void> => {
  try {
    const cacheData: CachedLocationData = {
      location,
      timestamp: Date.now(),
      ttl,
    };

    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Erreur lors de la sauvegarde du cache de localisation:', error);
  }
};

/**
 * Récupère la localisation depuis le cache si elle est encore valide
 * @returns Données de localisation ou null si le cache est invalide/inexistant
 */
export const getLocationCache = async (): Promise<LocationData | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(CACHE_KEY);
    
    if (!cachedString) {
      return null;
    }

    const cachedData: CachedLocationData = JSON.parse(cachedString);

    // Vérifier si le cache est encore valide
    if (!isCacheValid(cachedData)) {
      // Supprimer le cache expiré
      await clearLocationCache();
      return null;
    }

    return cachedData.location;
  } catch (error) {
    console.warn('Erreur lors de la récupération du cache de localisation:', error);
    return null;
  }
};

/**
 * Vérifie si un cache valide existe
 * @returns true si un cache valide existe, false sinon
 */
export const hasValidCache = async (): Promise<boolean> => {
  const cachedLocation = await getLocationCache();
  return cachedLocation !== null;
};

/**
 * Supprime le cache de localisation
 */
export const clearLocationCache = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.warn('Erreur lors de la suppression du cache de localisation:', error);
  }
};

/**
 * Obtient l'âge du cache en millisecondes
 * @returns Age du cache en millisecondes ou null si aucun cache
 */
export const getCacheAge = async (): Promise<number | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(CACHE_KEY);
    
    if (!cachedString) {
      return null;
    }

    const cachedData: CachedLocationData = JSON.parse(cachedString);
    return Date.now() - cachedData.timestamp;
  } catch (error) {
    console.warn('Erreur lors de la récupération de l\'âge du cache:', error);
    return null;
  }
};

/**
 * Obtient le temps restant avant expiration du cache
 * @returns Temps restant en millisecondes ou null si aucun cache valide
 */
export const getCacheTimeRemaining = async (): Promise<number | null> => {
  try {
    const cachedString = await AsyncStorage.getItem(CACHE_KEY);
    
    if (!cachedString) {
      return null;
    }

    const cachedData: CachedLocationData = JSON.parse(cachedString);
    
    if (!isCacheValid(cachedData)) {
      return null;
    }

    const now = Date.now();
    const age = now - cachedData.timestamp;
    return cachedData.ttl - age;
  } catch (error) {
    console.warn('Erreur lors de la récupération du temps restant du cache:', error);
    return null;
  }
};


