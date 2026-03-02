import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { supabase } from '../lib/supabase';

const STORAGE_BUCKET =
  process.env.EXPO_PUBLIC_SUPABASE_STORAGE_BUCKET || 'uploads';
const STORAGE_FOLDER = 'admin';

function getFileExtension(asset) {
  const fileName = asset?.fileName || '';
  const fileMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);

  if (fileMatch?.[1]) {
    return fileMatch[1].toLowerCase();
  }

  const mimeType = asset?.mimeType || '';
  const mimeMatch = mimeType.match(/image\/([a-zA-Z0-9.+-]+)/);

  if (mimeMatch?.[1]) {
    return mimeMatch[1].toLowerCase().replace('jpeg', 'jpg');
  }

  return 'jpg';
}

function buildStoragePath(asset) {
  const extension = getFileExtension(asset);
  const safeName = String(asset?.fileName || 'image')
    .replace(/\.[a-zA-Z0-9]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 48);

  return `${STORAGE_FOLDER}/${Date.now()}-${safeName || 'image'}.${extension}`;
}

async function ensureLibraryPermission() {
  if (Platform.OS === 'web') {
    return true;
  }

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return permission.granted;
}

async function assetToUploadBody(asset) {
  if (asset?.file) {
    return asset.file;
  }

  const response = await fetch(asset.uri);
  return response.arrayBuffer();
}

async function uploadAsset(asset) {
  if (!asset?.uri) {
    throw new Error('لم يتم اختيار صورة صالحة.');
  }

  const body = await assetToUploadBody(asset);
  const path = buildStoragePath(asset);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, body, {
      cacheControl: '3600',
      upsert: false,
      contentType: asset?.mimeType || 'image/jpeg',
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error('تعذر إنشاء رابط عام للصورة المرفوعة.');
  }

  return data.publicUrl;
}

export async function pickAndUploadImages(options = {}) {
  const { multiple = false } = options;
  const granted = await ensureLibraryPermission();

  if (!granted) {
    throw new Error('يلزم السماح بالوصول إلى الصور لرفع الملفات.');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: !multiple,
    allowsMultipleSelection: multiple,
    quality: 0.85,
  });

  if (result.canceled) {
    return [];
  }

  const assets = Array.isArray(result.assets) ? result.assets : [];
  const urls = [];

  for (const asset of assets) {
    const url = await uploadAsset(asset);
    urls.push(url);
  }

  return urls;
}

export default {
  pickAndUploadImages,
};
