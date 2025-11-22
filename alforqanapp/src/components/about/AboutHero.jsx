import React, { memo } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import aboutStyles from '../../Styles/AboutUsStyleSheet';
import { useThemedStyles } from '../../hooks/useThemedStyles';

function AboutHero({ hero }) {
  const styles = useThemedStyles(aboutStyles);
  if (!hero?.image && !hero?.text) return null;

  const imageSource =
    typeof hero.image === 'string' ? { uri: hero.image } : hero.image;

  if (!imageSource) {
    return (
      <View style={styles.heroCard}>
        <View style={styles.heroOverlay}>
          <Text style={styles.heroText}>{hero.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.heroCard}>
      <ImageBackground
        source={imageSource}
        style={styles.heroCard}
        imageStyle={styles.heroImage}
      >
        <View style={styles.heroOverlay}>
          {hero.text ? (
            <Text style={styles.heroText}>{hero.text}</Text>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}

AboutHero.displayName = 'AboutHero';

export default memo(AboutHero);
