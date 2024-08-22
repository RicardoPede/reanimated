import { Image, StyleSheet, Platform, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { HelloWave } from '@/src/components/HelloWave';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { useEffect, useState } from 'react';
import StyleButton from '@/src/components/basic/styleButton';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import AnimatedWithRepeat from '@/src/components/reanimated/AnimationsWithRepeat';
import AnimatedWithTimming from '@/src/components/reanimated/AnimationsWithTimming';

export default function HomeScreen() {
  const progress = useSharedValue(0);
  const opacity = useSharedValue(1);

  // color azul = rgb(0, 0, 255)
  // color rojo = rgb(255, 0, 0)
  // color amarillo = rgb(255, 255, 0)

  const [startColor, setStartColor] = useState('rgb(0, 0, 255)')
  const [endColor, setEndColor] = useState('rgb(255, 0, 0)');
  const [isLoading, setIsLoading] = useState(true);
  const [initGradient, setInitGradient] = useState(false);
  const [count, setCount] = useState(0);
  const [styleChange, setStyleChange] = useState(false);
  const [binariCount, setBinariCount] = useState(0);

  const animatedStyles = useAnimatedStyle(() => { // hook para animar el color de fondo
    const backgroundColor = interpolateColor( // interpolacion de color de fondo basado en el valor de progress
      progress.value, // valor de progreso
      [0, 1], // rango de valores (0 = azul, 1 = rojo)
      [startColor, endColor] // rango de colores (azul, rojo)
    );
    return {
      backgroundColor,
    };
  });

  useEffect(() => {
    const anumatedGradient = setInterval(async () => {
      if (!styleChange) { // si no hay cambio de estilo, cambia su valor cuando se presiona el boton 'Iniciar'
        if (startColor === 'rgb(0, 0, 255)' && endColor === 'rgb(255, 0, 0)') {
          // cuando posee los colores originales de inicio continua con la animacion
          if (!initGradient) {
            // de color azul a rojo
            progress.value = withTiming(1, { duration: 2000 }); // withTiming permite animar un valor de manera lineal, pasando un valor de 0 a 1 en 2 segundos
            setBinariCount(0) // binariCount es un contador que permite saber si la animacion va de azul a rojo o de rojo a azul
            setInitGradient(true); // initGradient es un estado que permite saber si la animacion ya fue iniciada
          } else {
            // de color rojo a azul
            progress.value = withTiming(0, { duration: 2000 });
            setBinariCount(1)
            setInitGradient(false);
          }
        } else {
          if (startColor === 'rgb(255, 255, 0)') {
            progress.value = withTiming(0, { duration: 3000, easing: Easing.linear });
            setStartColor('rgb(0, 0, 255)');
            setInitGradient(false);
          } else {
            setEndColor('rgb(255, 0, 0)');
            progress.value = withTiming(1, { duration: 3000, easing: Easing.linear });
            setInitGradient(true);
          }
        }
      } else { // si se ha presionado el boton 'Iniciar' se setea el color de fondo, ahora aparece el amarillo
        if (binariCount === 0) {
          setStartColor('rgb(255, 255, 0)');
          progress.value = withTiming(0, { duration: 4000 });
          setInitGradient(false);
        } else {
          setEndColor('rgb(255, 255, 0)');
          progress.value = withTiming(binariCount, { duration: 4000 });
          setInitGradient(true);
        }
      }
    }, 6000); // intervalo de tiempo para cambiar el color de fondo, se ejecuta cada 6 segundos
    return () => clearInterval(anumatedGradient); // limpiar intervalo
  }, [initGradient, styleChange, endColor, startColor]); // dependencias del hook useEffect, se ejecuta cuando cambia alguno de estos valores

  useEffect(() => { // hook para simular una carga de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { // hook para cambiar el estilo y lo pedido en la tarea, al presionar el boton 'Iniciar'
    if (count % 2 === 0) { // si el contador es par, se mantiene el estilo
      setStyleChange(false);
    } else {
      setStyleChange(true); // si el contador es impar, se cambia el estilo
    }
  }, [count]);

  useEffect(() => { // hook para animar la opacidad del título
    if (styleChange) {
      opacity.value = withTiming(0, { duration: 2000 });
    } else {
      opacity.value = withTiming(1, { duration: 2000 });
    }
  }, [styleChange, opacity]);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }
  );

  if (isLoading) { // si isLoading es true, se muestra un overlay de carga
    return (
      <ThemedView style={styles.loadingOverlay}>
        <HelloWave /> // manito saludando
        <ActivityIndicator animating={true} size="large" /> // overlay de carga
      </ThemedView>
    )
  }

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyles]}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {!isLoading &&
          <AnimatedWithTimming direction='vertical' distance={350} style={styles.container}>
            <Animated.Text style={[styles.containerText, animatedOpacityStyle]}>Welcome to</Animated.Text>
            <Animated.Text style={[styles.containerText, animatedOpacityStyle]}>My Animation's</Animated.Text>
          </AnimatedWithTimming>}
        <AnimatedWithRepeat style={styles.containerButton} duration={50000}>
          <StyleButton
            textStyle={{ fontSize: 20 }}
            disabled={isLoading}
            type={isLoading ? 'disabled' : 'warning'}
            style={{ borderRadius: 100, height: 115, width: 115 }}
            onPress={() => setCount(count + 1)}
            title="Iniciar"
          />
        </AnimatedWithRepeat>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    color: '#fff',
  },
  containerButton: {
    alignItems: 'center',
    position: 'absolute',
    bottom: "15%",
  },
});
