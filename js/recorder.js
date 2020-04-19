const record_anim = document.querySelector(".recording")
const record_btn = document.querySelector(".record");
const action = document.querySelector(".action");
const rec_opt = { 
    type: 'audio', 
    recorderType: StereoAudioRecorder,
    numberOfAudioChannels: 1,
    desiredSampRate: 14000
}

async function record(e){
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new RecordRTCPromisesHandler(stream, rec_opt);
    
    recorder.startRecording();
    recording();

    record_btn.onclick = async function(e){
        record_btn.onclick = null;
        loading()
        
        await recorder.stopRecording();
        await recorder.getBlob().then(prepareQuery)
    };
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