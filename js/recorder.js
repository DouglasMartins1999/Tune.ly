const record_anim = document.querySelector(".recording")
const record_btn = document.querySelector(".record");
const action = document.querySelector(".action");
const rec_timer = document.querySelector(".rec-time");
const rec_opt = { 
    type: 'audio', 
    recorderType: StereoAudioRecorder,
    numberOfAudioChannels: 1,
    desiredSampRate: 14000
}

async function record(){
    let timeout, timer, seconds = 0;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new RecordRTCPromisesHandler(stream, rec_opt);
    
    const renderRecTime = function(){
        seconds += 1;
        rec_timer.textContent = moment(seconds * 1000).format("mm:ss");
    }
    const stop = async function(){
        clearInterval(timer);
        clearTimeout(timeout);
        record_btn.onclick = null;
        seconds = 0;
        loading()
        
        await recorder.stopRecording();
        await recorder.getBlob().then(prepareQuery)
    };
    
    timer = setInterval(renderRecTime, 1000)
    timeout = setTimeout(stop, 30000);
    recorder.startRecording();
    recording();

    record_btn.onclick = stop; 
}

function recording(){
    action.src = "./images/stop.svg";
    record_anim.classList.add("anim");
    record_btn.classList.add("anim");
}

function loading(){
    action.src = "./images/loading.gif";
    record_anim.classList.remove("anim");
    record_btn.classList.remove("anim");
}

function restore(){
    action.src = "./images/microphone.svg";
    record_anim.classList.remove("anim");
    record_btn.classList.remove("anim");
    record_btn.onclick = record;
} 

record_btn.onclick = record;