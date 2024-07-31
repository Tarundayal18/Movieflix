///// Animation Refrence
/////// Animated spring , Animation timing
/// transform


import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Button } from 'react-native';

const Animation = () => {
    const [btnClicked, setBtnClicked] = useState(false)
    
    const animation = useRef(new Animated.Value(0)).current;                //// starting value 0

    const startanimation = () => {
        Animated.timing(animation, {                            ////////// spring or timming dono ke sath kar sakte hai spring mai thoda fast hota hai timming mai thoda smooth hota hai timming add karne par duration bhi de sakte hai ham  
            toValue: btnClicked ? 0 : 1,                                      /// kaha tak leke jana hai 0 se 1 tak
            duration: 1000, 
            useNativeDriver: true                            ///// smooth animation
        }).start();                                                /// animation ho jayega start
    }
    return (
        <>
            <Animated.View style={[{
                width: 100,
                height: 100,
                backgroundColor: 'blue',
                justifyContent: 'center',
                marginTop: 300,
                alignSelf: 'center',
                borderRadius: btnClicked ? 50 : 0                   //// rectangle to circle
            }, {
                transform: [
                    {
                        translateY: animation.interpolate({         //// uper se niche slide 
                            inputRange: [0, 1],
                            outputRange: [0, -100]
                        })
                    },
                    {
                        rotate: animation.interpolate({               ///// rotate ho raha hai 360 degree
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg']
                        })
                    },
                    {
                        translateX: animation.interpolate({         //// right to left slide 
                            inputRange: [0, 1],
                            outputRange: [0, 150]
                        })
                    },
                    {
                        scale: animation.interpolate({         //// size mai update
                            inputRange: [0, 1],
                            outputRange: [1, 0.5]
                        })
                    },
                ]
            }]} >

            </Animated.View>
            <Button onPress={() => {
                setBtnClicked(!btnClicked)
                startanimation();
            }} title="Fade In" />
        </>
    );
};

export default Animation;
