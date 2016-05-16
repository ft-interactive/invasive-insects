/* eslint-disable */

import d3 from 'd3';

const bugs = ['hornet','caterpillar','borer','ladybird','ant','worm','beetle'];
const speeds = ['fast','slow','fast','fast','fast','slow','fast'];
const range = [0,2,4,6];
const swarmSizes = [1,3,5,7];

function randomBug(specified){

	d3.selectAll('.bug')
	.style({
        'animation-play-state':'paused'
    })
    .transition()
    .duration(500)
    .style({
        'margin-left':function(){
            return d3.select(this).style('transform') == 'matrix(-1, 0, 0, 1, 0, 0)' ? '-150%':'100%'
        }
    })
    .remove();

	const index = Math.floor(Math.random()*7);
	const bug = specified != '' ? specified:bugs[index];
	const speed = specified != '' ? speeds[bugs.indexOf(specified)]:speeds[index];
	const swarmSize = swarmSizes[d3.bisect(range,index)];
	const leader = (swarmSize-1)/2;

	setTimeout(function(){

		d3.select('#insect-holder').selectAll('div').data(d3.range(0,swarmSize,1))
		.enter().append('div')
		.attr({
			class:'bug ' + bug
		});

		d3.selectAll('.bug')
		.classed(speed,true)
		.style({
		    'animation-play-state':'paused',
		    'margin-top':function(d,i){return i*swarmSize + 'vh'}
		})
		.transition()
		.delay(function(d,i){
		    if(i==leader){return 0}else
		    if(Math.abs(i-leader)==1){return 200}else
		    if(Math.abs(i-leader)==2){return 400}else
	    	if(Math.abs(i-leader)==3){return 600}else
			if(Math.abs(i-leader)==4){return 800}else
			if(Math.abs(i-leader)==5){return 1000}
		})
		.style({
		    'animation-play-state':'running'
		});

		d3.selectAll('.bug')
		.on('click',function(){
		    d3.select(this)
		    .style({
		        'animation-play-state':'paused'
		    })
		    .transition()
		    .duration(500)
		    .style({
		        'margin-left':function(){
		            return d3.select(this).style('transform') == 'matrix(-1, 0, 0, 1, 0, 0)' ? '-150%':'100%'
		        }
		    })
		    .remove();
		})
		.on('mouseenter',function(){
		    d3.select(this)
		    .style({
		        'animation-play-state':'paused'
		    })
		    .transition()
		    .duration(500)
		    .style({
		        'margin-left':function(){
		            return d3.select(this).style('transform') == 'matrix(-1, 0, 0, 1, 0, 0)' ? '-150%':'100%'
		        }
		    })
		    .remove();
		});

	},750);

}

window.onload = function(){
	randomBug('hornet');

	setTimeout(function(){
		if(d3.selectAll('#insect-holder div')[0].length == 0){
			randomBug('hornet');
		}
	},1000);
}

var doLoop;
function genBugs(){
	doLoop = setInterval(function(){
		randomBug('');
	},60000);
}

genBugs();

d3.selectAll('.pleaseNo').on('click',function(){
	d3.selectAll('.pleaseNo').html('Insects gone :-(');
	d3.selectAll('.bug')
	.style({
        'animation-play-state':'paused'
    })
    .transition()
    .duration(500)
    .style({
        'margin-left':function(){
            return d3.select(this).style('transform') == 'matrix(-1, 0, 0, 1, 0, 0)' ? '-150%':'100%'
        }
    })
    .remove();
	clearInterval(doLoop);
	d3.selectAll('.bug-card').on('click',function(){
		var thisBug = d3.select(this);
		setTimeout(function(){
			if(d3.selectAll('#insect-holder div')[0].length == 0){
				randomBug(thisBug.attr('class').split(' ')[1].replace(/_/g,''));
			}
		},300);
		randomBug(d3.select(this).attr('class').split(' ')[1].replace(/_/g,''));
		d3.selectAll('.pleaseNo').html('Shoo!');
	});
});

d3.selectAll('.bug-card').on('click',function(){
	var thisBug = d3.select(this);
	setTimeout(function(){
		if(d3.selectAll('#insect-holder div')[0].length == 0){
			randomBug(thisBug.attr('class').split(' ')[1].replace(/_/g,''));
		}
	},300);
	randomBug(d3.select(this).attr('class').split(' ')[1].replace(/_/g,''));
	d3.selectAll('.pleaseNo').html('Shoo!');
});

document.addEventListener('visibilitychange', function(){
    if(document.visibilityState == 'visible'){
    	randomBug('');
    };
});

/* eslint-enable */
