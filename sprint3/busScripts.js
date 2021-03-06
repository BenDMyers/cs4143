// KEYBOARD CONSTANTS
var SPACE_BAR = 32;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var COMMA_KEY = 222;
var PERIOD_KEY = 191;
var A_KEY = 65;
var D_KEY = 68;
var Q_KEY = 81;
var S_KEY = 83;
var W_KEY = 87;
var Z_KEY = 90;

// OTHER CONSTANTS
var XAXIS = new THREE.Vector3(1,0,0);

function drive(node)
{
    var wheels = currentScene.getObjectByName("wheelsNode");
    if(wheels === undefined)
    {
        console.log("wheels undefined")
        return;
    }

    var wav = wheels.userData["wheelAngularVelocity"];

    if(pressedKeys[UP_ARROW] == true) // FORWARD
    {
        // DETERMINE WHEELS' ROTATIONAL VELOCITY
        wav = Math.min(wav + frameDuration/10, 2.0);
    }
    else if (pressedKeys[DOWN_ARROW] == true) // REVERSE
    {
        // DETERMINE WHEELS' ROTATIONAL VELOCITY
        wav = Math.max(wav - frameDuration/10, -2.0);
    }
    else if (wav != 0.0) // COME TO A REST
    {
        var sign = wav/Math.abs(wav) // 1 if positive, -1 if negative
        wav = wav - sign * frameDuration/10; // this will get wheel angular velocity to approach zero
    }
    else
    {
        return; // wheels aren't spinning, wav = 0
    }
    wheels.userData["wheelAngularVelocity"] = wav;

    // ACTUALLY ROTATE THE WHEELS
    // var children = node.children;
    // var wheels = children["wheelsNode"];
    for (var i = 0; i < wheels.children.length; i++)
    {
        wheels.children[i].rotateY(-1 * wav * frameDuration);
    }
    console.log("ω: " + wav + " | θ: " + wheels.children[0].rotation.y  + " | α: " + frameDuration/10);

    // MOVE THE BUS
    // v = ωr
    var linearVelocity = wav / 0.5;
    node.position.z += linearVelocity * frameDuration;
}
