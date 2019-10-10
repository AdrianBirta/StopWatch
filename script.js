let updateTime=0;
let resume=false;

$('.start').click(function(){
	let start = + new Date();
	const $seconds = $('.seconds');
	const $ms = $('.ms')
	const $minutes = $('.minutes');
	const $hours = $('.hours')

	if(resume === false){

		let time=null;
		let sec=null;
		let min=0;
		let hours=0;

		const id = setInterval(function(){
			let aux = parseInt( ( parseInt((+ new Date() - start)/10) ) /100 ) // obtinem secundele

			if(aux > 0 && aux % 60 === 0) {
				start = + new Date()
				time = parseInt((+ new Date() - start)/10)
				sec = parseInt(time / 100);
				min++;

				if(min % 60 === 0) {
					hours++;
					min=0;	
				} 

			} else {
				time = parseInt((+ new Date() - start)/10);
				sec = parseInt(time / 100);
			}
			
			console.log(hours)

			if(time > 99){
				time = time % 100;
			}

			const ms = (''+time).padStart(2,'0')
			sec = (''+sec).padStart(2,'0')
			// console.log(ms, sec)

			
			
			$ms.text(ms)
			$seconds.text(sec)
			
			if(min > 9) {
				$minutes.text(min)
			} else {
				$minutes.text('0'+min)
			}

			if(hours > 9) {
				$hours.text(hours)
			} else {
				$hours.text('0'+hours)
			}

			$idSave = id;
			$hoursSave = hours;
			$minSave = min;
			$secondSave = sec;
			$msSave = ms;
			

		}, 10)

		setTimeout(function(){
			clearInterval(id)

		},9990000)
		
		$(this).addClass('hide');
		$('.pause').removeClass('hide');
		resume=true;		
	
		
	} else if(resume === true){

		const id = setInterval(function(){

			$msSave = (''+($msSave % 100)).padStart(2,'0') 
			
			$secondSave= parseInt($secondSave)
			
			if($msSave == '99') {
				$secondSave = $secondSave +1;
			}

			if($secondSave == '59') { //59
				$minSave = $minSave + 1;
				$secondSave = $secondSave * 0;
			}

			if($minSave == '59') { //59
				$hoursSave = $hoursSave + 1;
				$minSave = $minSave * 0;
			}

			$secondSave = (''+($secondSave % 100)).padStart(2,'0')
			
			ms = $msSave;
			sec = $secondSave;
			min = $minSave;
			hours = $hoursSave;

			$msSave = Number($msSave) + 1;

			if(hours > 9) {
				$hours.text(hours)
			} else {
				$hours.text('0'+hours)
			}
			if(min > 9) {
				$minutes.text(min)
			} else {
				$minutes.text('0'+min)
			}
			$seconds.text(sec)
			$ms.text(ms)

			$idSave = id;

		}, 10)
	
		setTimeout(function(){
			clearInterval(id)

		},9990000)
			
		$(this).addClass('hide');
		$('.pause').removeClass('hide');

		
		
	}

});

$('.pause').click(function(){
	resume = true;
   	clearInterval($idSave)
   	$('.seconds').text($secondSave)
   	$('.ms').text($msSave)
   	updateTime=1;
	console.log('$minSave: ', $minSave, '$secondSave: ', $secondSave, '$msSave: ', $msSave)
	   
	$('.start').removeClass('hide');
	$('.start').text('RESUME')
	$('.pause').addClass('hide');
})

$('.reset').click(function(){
	clearInterval($idSave)
	$secondSave = '00';
	$msSave = '00';
	$minSave = '00';
	$hoursSave = '00';
	$('.hours').text($hoursSave);
	$('.minutes').text($minSave);
	$('.seconds').text($secondSave)
   	$('.ms').text($msSave)
	$('.start').removeClass('hide');
	$('.start').text('START')
	$('.pause').addClass('hide'); 
	resume = false;
	// console.log(resume)
});


