function encode() {
    const imageInput = document.getElementById('imageInput');
    const messageInput = document.getElementById('messageInput');
    const encodedImage = document.getElementById('encodedImage');

    const reader = new FileReader();

    reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);

            const message = messageInput.value;

            // Convert the message to binary
            const binaryMessage = textToBinary(message);

            // Encode the message in the image
            encodeMessage(context, binaryMessage);

            encodedImage.src = canvas.toDataURL('image/png');

            // Save the encoded image
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'encoded_image.png';
            link.click();
        };
    };

    reader.readAsDataURL(imageInput.files[0]);
}

function encodeMessage(context, message) {
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const data = imageData.data;

    let messageIndex = 0;
    for (let i = 0; i < data.length; i += 4) {
        // Set the least significant bit of each channel to the message bit
        data[i] &= 0xFE; // Clear the least significant bit
        data[i] |= parseInt(message[messageIndex], 2); // Set the least significant bit to the message bit
        messageIndex++;

        // Stop encoding when the entire message is encoded
        if (messageIndex >= message.length) {
            break;
        }
    }

    context.putImageData(imageData, 0, 0);
}

function textToBinary(text) {
    return text.split('').map(function (char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
}
