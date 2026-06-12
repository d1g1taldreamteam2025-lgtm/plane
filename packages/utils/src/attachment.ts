/**
 * Copyright (c) 2023-present Plane Software, Inc. and contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 * See the LICENSE file for details.
 */

export const generateFileName = (fileName: string) => {
  const date = new Date();
  const timestamp = date.getTime();

  const _fileName = getFileName(fileName);
  const nameWithoutExtension = _fileName.length > 80 ? _fileName.substring(0, 80) : _fileName;
  const extension = getFileExtension(fileName);

  return `${nameWithoutExtension}-${timestamp}.${extension}`;
};

export const getFileExtension = (filename: string) => filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);

export type TAttachmentPreviewType = "image" | "video" | "audio" | "pdf";

const ATTACHMENT_PREVIEW_EXTENSIONS: Record<TAttachmentPreviewType, string[]> = {
  image: ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"],
  video: ["mp4", "webm", "ogg", "ogv", "mov", "m4v"],
  audio: ["mp3", "wav", "oga", "aac", "flac", "m4a"],
  pdf: ["pdf"],
};

/**
 * Returns the inline-preview category for a given file (by name or asset url),
 * or null when the file is not previewable inside the app.
 */
export const getAttachmentPreviewType = (fileNameOrUrl: string): TAttachmentPreviewType | null => {
  const extension = getFileExtension(fileNameOrUrl).toLowerCase();
  if (!extension) return null;
  for (const type of Object.keys(ATTACHMENT_PREVIEW_EXTENSIONS) as TAttachmentPreviewType[]) {
    if (ATTACHMENT_PREVIEW_EXTENSIONS[type].includes(extension)) return type;
  }
  return null;
};

export const getFileName = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf(".");

  const nameWithoutExtension = fileName.substring(0, dotIndex);

  return nameWithoutExtension;
};

export const convertBytesToSize = (bytes: number) => {
  let size;

  if (bytes < 1024 * 1024) {
    size = Math.round(bytes / 1024) + " KB";
  } else {
    size = Math.round(bytes / (1024 * 1024)) + " MB";
  }

  return size;
};
