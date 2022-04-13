import { config } from './config';
import { addIosImageSetContents } from '../../../services/ios/service';
import { generateResizedAssetsWithoutAlpha } from '../../../services/image.processing';

export const addIosIcon = async (iconSource: string, backgroundColor: string) => {
  const iosIconFolder = addIosImageSetContents('AppIcon');
  await generateIosIcons(iconSource, iosIconFolder, backgroundColor);
};

const generateIosIcons = (iconSource: string, iosIconFolder: string, backgroundColor: string) =>
  Promise.all(
    config.iosIconSizes.map((size) =>
      Promise.all(
        size.multipliers.map((multiplier) => {
          const sizePx = size.size * multiplier;
          return generateResizedAssetsWithoutAlpha(
            iconSource,
            `${iosIconFolder}/icon-${size.size}@${multiplier}x.png`,
            sizePx,
            sizePx,
            {
              fit: 'cover',
            },
            backgroundColor
          );
        })
      )
    )
  );
