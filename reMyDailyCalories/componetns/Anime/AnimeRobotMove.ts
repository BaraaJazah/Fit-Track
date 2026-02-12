import  {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
  } from "react-native-reanimated";


    const translateX = useSharedValue<number>(0);

    const handlePressRight = () => {
        translateX.value -= 50;
      };
    
      const handlePressLeft = () => {
        translateX.value += 50;
      };
    

      const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withSpring(translateX.value ) }],
      }));


// export default AnimeRobotMove;
export {

}

