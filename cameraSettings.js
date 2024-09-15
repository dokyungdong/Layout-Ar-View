// cameraSettings.js

// 카메라 설정 가져오기
function applyCameraSettings() {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      if (videoDevices.length > 0) {
        return navigator.mediaDevices.getUserMedia({ video: true });
      }
      throw new Error('No video devices found');
    })
    .then(stream => {
      const videoTrack = stream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();

      // 카메라의 해상도와 비율 가져오기
      const { width, height } = settings;

      // A-Frame 카메라에 적용
      const cameraEntity = document.querySelector('[camera]');
      if (cameraEntity) {
        cameraEntity.setAttribute('camera', {
          fov: 120, // 예시: 실제 값으로 조정 필요
          aspectRatio: width / height
        });
      }
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
    });
}

// 페이지 로드 후 카메라 설정 적용
window.addEventListener('load', applyCameraSettings);
