async function sendFile(event) {
  event.preventDefault();

  const file = document.querySelector('input').files[0];
  const myImage = await getBase64(file);

  localStorage.setItem('my-image', myImage);

  await sendChunks(myImage);
}

async function getBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

async function sendChunks(input, startByte = 0) {
  const chunkSize = 500;
  const chunks = Math.ceil(input.length / chunkSize);

  if (startByte === 0) {
    await sendData('Start');
  }

  for (let i = startByte; i < input.length; i += chunkSize) {
    const lastByte = Math.min(i + chunkSize, input.length);
    const chunk = Math.ceil(lastByte / chunkSize);
    console.log(`Sending chunk ${chunk} of ${chunks}`);

    await sendData(input.slice(i, lastByte));
  }

  await sendData('End');

  localStorage.removeItem('my-image');

  console.log('Upload complete!');
}

async function sendData(data) {
  return fetch('http://localhost:3000/upload', {
    method: 'POST',
    mode: 'no-cors',
    body: data
  });
}

window.onload = async () => {
  const myImage = localStorage.getItem('my-image');

  if (myImage) {
    console.log('Resuming upload!');

    const response = await fetch('http://localhost:3000/current-byte');
    const { bytes } = await response.json();

    console.log('Starting at byte: ', bytes);

    await sendChunks(myImage, bytes);
  }
};
