import React from 'react';
import { usePlayer } from '@empirica/core/player/classic/react';
import { Button } from '../components/Button.jsx';

export function Results(){
    const player = usePlayer()
    return (
    <div>
       <p>You chose ${player.round.get("decision")}</p>
       <Button handleClick={() => player.stage.set("submit", true)}>
        Play Again
       </Button>
    </div>
    )
}