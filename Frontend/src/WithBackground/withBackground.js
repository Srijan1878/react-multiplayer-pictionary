import { animationProperties, spiralScalingAnimation } from '../animations/variants'
import classes from './WithBackground.module.css'
import { motion } from 'framer-motion'
import SpeakerSvg from '../components/Speaker/Speaker'
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle'
import { useState, useEffect } from 'react'
import ModalOverlay from '../components/Modal/components/ModalOverlay/ModalOverlay'

const withBackground = (WrappedComponent, noSpeaker = false, animationStatus = true, titleAnimatedPreloader = false) => {
    const UpdatedComponent = () => {
        const [isPreloaderActive, setIsPreloaderActive] = useState(false)

        useEffect(() => {
            if (!titleAnimatedPreloader) {
                setIsPreloaderActive(false)
            }
            let animationTimeout = setTimeout(() => {
                setIsPreloaderActive(false)
            }, 6000)
            return () => {
                clearTimeout(animationTimeout)
            }
        }, [])

        return (
            <motion.div className={classes.pageWrapper} variants={spiralScalingAnimation} initial={animationProperties.initial}
                animate={animationProperties.animate} exit={{ opacity: 0.25 }}>
                {(titleAnimatedPreloader && isPreloaderActive) &&
                    <>
                        <AnimatedTitle />
                        <ModalOverlay />
                    </>
                }
                {!isPreloaderActive &&
                    <>
                        <WrappedComponent />
                        {!noSpeaker && <SpeakerSvg />}
                    </>}
            </motion.div>
        )
    }
    return UpdatedComponent
}

export default withBackground