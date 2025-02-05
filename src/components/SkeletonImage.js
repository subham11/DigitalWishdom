// src/components/SkeletonImage.js
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonImage = ({ source, style, resizeMode = 'cover' }) => {
  const [loaded, setLoaded] = useState(false);

  // Extract numeric width/height if available; otherwise, fallback to defaults.
  const width = style?.width || 100;
  const height = style?.height || 100;
  const borderRadius = style?.borderRadius || 0;

  return (
    <View>
      {!loaded && (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={width}
            height={height}
            borderRadius={borderRadius}
          />
        </SkeletonPlaceholder>
      )}
      <Image
        source={source}
        style={[style, { display: loaded ? 'flex' : 'none' }]}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoaded(true)}
      />
    </View>
  );
};

export default SkeletonImage;
