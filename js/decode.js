function decode() {
    const encodedImageInput = document.getElementById('encodedImageInput');
    const decodedMessage = document.getElementById('decodedMessage');

    const reader = new FileReader();

    reader.onload = function (e) {
        const savedImage = new Image();
        savedImage.src = e.target.result;

        savedImage.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = savedImage.width;
            canvas.height = savedImage.height;
            const context = canvas.getContext('2d');
            context.drawImage(savedImage, 0, 0);

            // Decode the message from the image
            const decodedBinaryMessage = decodeMessage(context);

            // Convert binary message to text
            const decodedMessageText = binaryToText(decodedBinaryMessage);

            // Display the decoded message
            decodedMessage.textContent = decodedMessageText;
        };
    };

    reader.readAsDataURL(encodedImageInput.files[0]);
}

function decodeMessage(context) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    let binaryMessage = '';
    for (let i = 0; i < data.length; i += 4) {
        // Get the least significant bit of each channel
        const messageBit = data[i] & 1;
        binaryMessage += messageBit;
    }

    return binaryMessage;
}

function binaryToText(binaryMessage) {
    const chunks = binaryMessage.match(/.{1,8}/g);
    const textMessage = chunks.map(chunk => String.fromCharCode(parseInt(chunk, 2))).join('');
    return textMessage;
}
