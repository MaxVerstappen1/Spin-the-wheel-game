// Immediately invoked function expression
// to not pollute the global scope
(function () {
    const wheel = document.querySelector('.wheel');
    const spinButton = document.querySelector('.button');
    const display = document.querySelector('.display');
    const confetti = document.querySelector('.confetti');


    let deg = 0;
    let segmentSize = 18; //deg

    //represents the values in each segment of the wheel
    const segmentValues = {
        1: "100",
        2: "250",
        3: "100",
        4: "500",
        5: "100",
        6: "250",
        7: "100",
        8: "350",
        9: "100",
        10: "1000",
        11: "100",
        12: "350",
        13: "100",
        14: "250",
        15: "100",
        16: "500",
        17: "100",
        18: "250",
        19: "100",
        20: "350"

    };

    //function to determine if the user wins
    const handleWin = (actualDeg, selectedWinAmount) => {
        // Calculating the segment that the arrow landed on
        const winningValueNr = Math.round(actualDeg / segmentSize);

        // Getting the win amount from the winning segment
        const winningValue = segmentValues[winningValueNr];

        // Displaying the value linked to the segment
        display.innerHTML = winningValue;



        // Comparing the win amount with the selected value
        if (winningValue === selectedWinAmount) {
            alert(`Congratulations! You won.`)
           
            // Add winning animation class
            wheel.classList.add('winning-animation');
        
            // Remove winning animation class after the animation duration (1000ms in this case)
            setTimeout(() => {
                wheel.classList.remove('winning-animation');
            }, 1000);
        

        } else {
            alert(`Sorry, you lost. Try again!`);
            console.log('Sorry, it\'s a loss.');
            // Add your loss logic here
        }
    };

    //adding a click event listener to spinButton
    spinButton.addEventListener('click', () => {
        //Reset display
        display.innerHTML = "-";


        //disable spin button to prevent multiple clicks during animation
        spinButton.style.pointerEvents = 'none';

        // I only played the sound once as the wheel does a very high number of rotations and playing 
        //the sound for every 18 degrees that the wheel rotates would not sound good.
        var audio = new Audio('Tick.wav');
        audio.play();

        // Generating a random degree to determine the amount of rotation
        deg = Math.floor(2500 + Math.random() * 2500);


        wheel.style.transition = 'all 5s ease-out';
        //rotating the wheel to the calculated degree
        wheel.style.transform = `rotate(${deg}deg)`;

        //adding blur when the wheel spins
        wheel.classList.add('blur')


    });

    //Adding a transitionend event listener to the wheel
    wheel.addEventListener('transitionend', () => {
        //removing blur when the wheel has finished spinning
        wheel.classList.remove('blur');

        //activate spin button
        spinButton.style.pointerEvents = 'auto';

        //set transition to none
        wheel.style.transition = 'none';

        // calculate the actual degree
        const actualDeg = deg % 360;

        wheel.style.transform = `rotate(${actualDeg}deg)`;

        // Get the selected win amount from the dropdown
        const selectedWinAmount = document.getElementById('winAmount').value;

        // call the fuctiion to determine if the user wins
        handleWin(actualDeg, selectedWinAmount)
    })

})();
