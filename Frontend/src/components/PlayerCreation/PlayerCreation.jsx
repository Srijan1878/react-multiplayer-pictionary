import React from 'react'
import GameInputField from '../GameInputField/GameInputField'
import PlayerAvatarSelector from '../PlayerAvatarSelector/PlayerAvatarSelector'
import classes from './PlayerCreation.module.css'

export default function PlayerCreation() {
    return (
        <div className={classes.playerCreationContainer}>
            <GameInputField placeholder={'Your Name'} name={'playerName'}/>
            <PlayerAvatarSelector />
        </div>
    )
}
