module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@media': './src/components/media',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@theme': './src/theme',
            '@config': './src/config',
            '@services': './src/services',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@types': './src/types',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

