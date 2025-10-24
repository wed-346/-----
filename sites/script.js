const composers = ['palestrina','monteverdi','gabrieli','marenzio','lasso','caccini'];

function toggleAudio(composer) {
  const audio = document.getElementById(`${composer}-audio`);
  const btn = document.querySelector(`#player-${composer} .audio-btn`);
  
  if(audio.paused){
    // остановим все остальные плееры
    composers.forEach(c => {
      if(c !== composer){
        document.getElementById(`${c}-audio`).pause();
        document.querySelector(`#player-${c} .audio-btn`).textContent = '▶';
      }
    });
    audio.play();
    btn.textContent = '⏸';
  } else {
    audio.pause();
    btn.textContent = '▶';
  }

  audio.ontimeupdate = () => updateProgress(composer);
  audio.onended = () => {
    btn.textContent = '▶';
    updateProgress(composer);
  };
}

function updateProgress(composer){
  const audio = document.getElementById(`${composer}-audio`);
  const bar = document.getElementById(`${composer}-progress`);
  const time = document.getElementById(`${composer}-time`);
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  bar.style.width = percent + '%';

  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60).toString().padStart(2,'0');
  const durMins = Math.floor(audio.duration / 60) || 0;
  const durSecs = Math.floor(audio.duration % 60).toString().padStart(2,'0');
  time.textContent = `${mins}:${secs} / ${durMins}:${durSecs}`;
}

function setProgress(composer, e){
  const audio = document.getElementById(`${composer}-audio`);
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
  updateProgress(composer);
}

// Инициализация прогресса для всех композиторов
composers.forEach(composer => {
  const audio = document.getElementById(`${composer}-audio`);
  audio.addEventListener('loadedmetadata', () => {
    updateProgress(composer);
  });
});