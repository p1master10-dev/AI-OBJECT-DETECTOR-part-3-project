var modelStatus = '';
var objects = [];

function setup() {
            canvas = createCanvas(380, 380);
            canvas.center();
            video = createCapture(VIDEO);
            video.size(380, 380);
            video.hide();
            objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function start() {
            document.getElementById('status').innerHTML = 'Status: Detecting Any Objects on screen';
            inputValue = document.getElementById('object-inp').value;
            
            if(inputValue == valueText) {
                        video.stop();
                        objectDetector.detect(gotResult);
                        document.getElementById('object_found_status').innerText = 'Object Detector : ' + inputValue + ' found !';
                        var synth = window.speechSynthesis;
                        var utterThis = new SpeechSynthesisUtterance(inputValue + ' found !');
                        synth.speak(utterThis);
            }else {
                        document.getElementById('object_found_status').innerText = 'Object Detector : ' + inputValue + ' not found';
            }
}


function modelLoaded() {
            console.log('CoCoSSd model loaded !');
            modelStatus = 'true';
}

function draw() {
            image(video , 0 , 0 , 380 , 380);
            if (modelStatus !== '') {
                        objectDetector.detect(video, gotResult);
                        for (i = 0; i < objects.length; i++) {
                                    document.getElementById('status').innerHTML = 'Status : Objects Detected';
                                    fill('#ff0000');
                                    percent = floor(objects[ i ].confidence * 100);
                                    valueText = objects[i].label;
                                    text(valueText + ' ' + percent + '%', objects[ i ].x + 15, objects[ i ].y + 15);
                                    noFill();
                                    stroke('red');
                                    rect(objects[ i ].x, objects[ i ].y, objects[ i ].width, objects[ i ].height);
                        }
            }
}

function gotResult(error , results) {
            if(error) {
                        console.log(error);
            }else {
                        console.log(results);
                        objects = results;
            }
}



