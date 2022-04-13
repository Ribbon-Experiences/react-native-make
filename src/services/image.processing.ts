import { normalize } from 'path';
import sharp, { ResizeOptions } from 'sharp';
import { createDirectoryIfNotExists } from './file.processing';

export const generateResizedAssets = async (
  sourcePath: string,
  destinationPath: string,
  width: number,
  height: number = width,
  options: ResizeOptions = {
    fit: 'cover',
  }
) => {
  createDirectoryIfNotExists(destinationPath);
  return sharp(normalize(sourcePath)).resize(width, height, options).toFile(destinationPath);
};

export const generateResizedAssetsWithoutAlpha = async (
  sourcePath: string,
  destinationPath: string,
  width: number,
  height: number = width,
  options: ResizeOptions,
  backgroundColor: string
) => {
  createDirectoryIfNotExists(destinationPath);
  return sharp(normalize(sourcePath))
    .resize(width, height, options)
    .flatten({ background: backgroundColor ?? { r: 0, g: 0, b: 0 } })
    .toFile(destinationPath);
};
