video = "";
status = "";
function preload() {
    video = createVideo("video.mp4");
    video.hide();
}
function setup() {
    canvas = createCanvas(480, 350);
    canvas.center();

}
function draw() {
    image(video, 0, 0, 480, 350);
    if (status != "") {
        objectdetector.detect(video, gotresult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Object Detected";
            document.getElementById("numberofobjects").innerHTML="Number of objects detected are "+objects.length;
            fill("red");
            noFill();
            stroke("cyan");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+""+percentage+"%",objects[i].x,objects[i].y);
        }
    }
}
function start() {
    objectdetector = ml5.objectDetector('cocossd', modalloaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}
function modalloaded() {
    console.log("modal loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0.0);
}
objects = [];
function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}