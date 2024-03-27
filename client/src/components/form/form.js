import React, { useState } from 'react';
import handleSubmitImage from './handleSubmitImage'; // Make sure this path is correct
import handleSubmitAnimation from './handleSubmitAnimation'; // Make sure this path is correct
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SubmitButton from './SubmitButton';

export default function Form() {
  // Destructure the initial state values from constants
  const [prompts, setPrompts] = useState('beautiful lady, (freckles), big smile, ruby eyes, short hair, dark makeup,head and shoulders portrait, cover');
  const [maxFrames, setMaxFrames] = useState('100');
  const [positivePrompts, setPositivePrompts] = useState('hyperdetailed photography, soft light, masterpiece, (film grain:1.3), (complex:1.2), (depth of field:1.4), detailed');
  const [negativePrompts, setNegativePrompts] = useState('(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3), morbid, ugly, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, glitch, duplicate');
  const [loras, setLoras] = useState('<lora:add-detail-xl:1> <lora:Made Of Iridescent Foil:1> <lora:popovy_SDXL-fashion-doll:1>');

  // Handle response message state
  const [responseMessage, setResponseMessage] = useState('');

  // Corrected form submit handler for animation
  const handleAnimationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSubmitAnimation({ prompts, maxFrames, positivePrompts, loras, negativePrompts });
      setResponseMessage(response.message); // Assuming the response contains a message
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error generating animation.');
    }
  };

  // Corrected form submit handler for images
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleSubmitImage({ prompts, positivePrompts, loras, negativePrompts });
      setResponseMessage(response.message); // Assuming the response contains a message
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error generating image.');
    }
  };

  return (
    <>
      <div className="order-2 lg:order-1">
        <form onSubmit={handleAnimationSubmit} className='text-xs'>
          <TextAreaInput label="Prompts" value={prompts} onChange={(e) => setPrompts(e.target.value)} />
          <TextAreaInput label="Positive Prompts" value={positivePrompts} onChange={(e) => setPositivePrompts(e.target.value)} />
          <TextAreaInput label="Negative Prompts" value={negativePrompts} onChange={(e) => setNegativePrompts(e.target.value)} />
          <TextAreaInput label="Loras" value={loras} onChange={(e) => setLoras(e.target.value)} />
          <TextInput label="Max Frames" type="number" value={maxFrames} onChange={(e) => setMaxFrames(e.target.value)} required />
          <SubmitButton text="Generate Video" colorClass="bg-green-200 hover:bg-green-300" />
        </form>

        <form onSubmit={handleImageSubmit} className='mt-4 text-xs'>
          <SubmitButton text="Generate Image" colorClass="bg-blue-200 hover:bg-blue-300" />
        </form>
      </div>
    </>
  );
}