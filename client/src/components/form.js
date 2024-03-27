import React, { useState } from 'react';

export default function BundestagPromptsForm() {
  // Update initial state to include a negativePrompt field
  const [prompts, setPrompts] = useState('beautiful lady, (freckles), big smile, ruby eyes, short hair, dark makeup,head and shoulders portrait, cover');
  const [maxFrames, setMaxFrames] = useState('100');
  const [positivePrompts, setPositivePrompts] = useState('hyperdetailed photography, soft light, masterpiece, (film grain:1.3), (complex:1.2), (depth of field:1.4), detailed');
  const [negativePrompts, setNegativePrompts] = useState('(worst quality, low quality, normal quality, lowres, low details, oversaturated, undersaturated, overexposed, underexposed, grayscale, bw, bad photo, bad photography, bad art:1.4), (watermark, signature, text font, username, error, logo, words, letters, digits, autograph, trademark, name:1.2), (bad hands, bad anatomy, bad body, bad face, bad teeth, bad arms, bad legs, deformities:1.3), morbid, ugly, mutated malformed, mutilated, poorly lit, bad shadow, draft, cropped, out of frame, cut off, censored, jpeg artifacts, glitch, duplicate');
  const [loras, setLoras] = useState('<lora:add-detail-xl:1> <lora:Made Of Iridescent Foil:1> <lora:popovy_SDXL-fashion-doll:1>');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const keyframe = Math.floor(parseInt(maxFrames, 10) / 4);
    const formattedPrompts = prompts.replace(/\n/g, ' ');

    const parameters = {
      deforum_settings: {
        "prompts": {
          "0": formattedPrompts  + " () " + positivePrompts + " " + loras + " --neg " + negativePrompts,
          [keyframe.toString()]: formattedPrompts  + " // " + positivePrompts + " " + loras + " --neg " + negativePrompts  // Use the calculated keyframe
        },
        "max_frames": parseInt(maxFrames, 10),
      }
    };

    try {
      const response = await fetch('/generate-bundestag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });

      if (response.ok) {
        console.log("Video generated and saved successfully!");
      } else {
        console.log("Error generating or saving the video.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSubmitImage = async (e) => {
    e.preventDefault();

    const formattedPrompts = prompts.replace(/\n/g, ' ');

    // Parameters object includes both user-defined and fixed values
    const parameters = {
      prompt: formattedPrompts  + " " + positivePrompts + " " + loras,
      negative_prompt: negativePrompts,
    };

    try {
      const response = await fetch('/generate-bundestag-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
      });

      if (response.ok) {
        // Handle success, maybe display the generated image or a success message
        console.log("Image generated and saved successfully!");
      } else {
        // Handle error
        console.log("Error generating or saving the image.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className="order-2 lg:order-1">
      <form onSubmit={handleSubmit} className='text-xs'>
        <div className='flex gap-4 mb-4'>
          <label htmlFor="maxFrames" className='min-w-24'>
          Prompts:
          </label>
          <textarea
            className='w-full h-32 bg-white border rounded-xl px-3 py-2'
            id="prompts"
            name="prompts"
            value={prompts}
            onChange={(e) => setPrompts(e.target.value)}
          />
        </div>
        <div className='flex gap-4 mb-4'>
          <label htmlFor="maxFrames" className='min-w-24'>
            Positive Prompts:
          </label>
          <textarea
            className='w-full h-20 bg-white border rounded-xl px-3 py-2'
            id="positivePrompts"
            name="positivePrompts"
            value={positivePrompts}
            onChange={(e) => setPositivePrompts(e.target.value)}
          />
        </div>
        <div className='flex gap-4 mb-4'>
          <label htmlFor="maxFrames" className='min-w-24'>
            Negative Prompts:
          </label>
          <textarea
            className='w-full h-32 bg-white border rounded-xl px-3 py-2'
            id="negativePrompts"
            name="negativePrompts"
            value={negativePrompts}
            onChange={(e) => setNegativePrompts(e.target.value)}
          />
        </div>
        <div className='flex gap-4 mb-4'>
          <label htmlFor="maxFrames" className='min-w-24'>
            Loras:
          </label>
          <textarea
            className='w-full h-20 bg-white border rounded-xl px-3 py-2'
            id="loras"
            name="loras"
            value={loras}
            onChange={(e) => setLoras(e.target.value)}
          />
        </div>
        <div className='flex gap-4 mb-4'>
          <label htmlFor="maxFrames" className='min-w-24'>
          Max Frames:
          </label>
          <input
            className='w-full bg-white border rounded-xl px-3 py-2'
            type="number"
            id="maxFrames"
            name="maxFrames"
            value={maxFrames}
            onChange={(e) => setMaxFrames(e.target.value)}
            required
          />
        </div>
        <input className='uppercase cursor-pointer w-full py-2 border transition rounded-lg bg-green-200 hover:bg-green-300' type="submit" value="Generate Video" />
      </form>

      <form onSubmit={handleSubmitImage}>
        <div className='hidden'>
          <label htmlFor="prompts">Enter your prompt:</label>
          <input
            type="text"
            id="prompts"
            name="prompts"
            value={prompts}
            onChange={(e) => setPrompts(e.target.value)}
            required
          />
        </div>
        {/* <input className='uppercase cursor-pointer w-full py-2 border transition rounded-lg bg-red-200 text-xs mt-4 hover:bg-red-300' type="submit" value="Stop Video Generation" /> */}
        <input className='uppercase cursor-pointer w-full py-2 border transition rounded-lg bg-blue-200 text-xs mt-4 hover:bg-blue-300' type="submit" value="Generate Image" />
      </form>

    </div>
    </>
  );
}

