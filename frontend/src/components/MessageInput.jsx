import { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { gsap } from 'gsap';
import { Send, Image, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef(null);
  const sendRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith('image/')) return toast.error('Select an image file');
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!text.trim() && !imagePreview) return;

    gsap.fromTo(sendRef.current, { scale: 1 }, {
      scale: 0.8, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.in',
    });

    await sendMessage({ text: text.trim(), image: imagePreview });

    setText('');
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className="px-4 py-3 border-t border-border bg-panel/60">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-2.5 inline-flex relative">
          <img src={imagePreview} alt="" className="h-20 rounded-xl border border-border object-cover" />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-danger rounded-full flex items-center justify-center text-white hover:bg-danger/80 transition-colors shadow-lg"
          >
            <X size={10} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Image attach */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex-shrink-0 p-2.5 rounded-xl border border-border text-soft
            hover:text-accent hover:border-accent/30 hover:bg-accent/5
            transition-all"
        >
          <Image size={17} />
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

        {/* Text area */}
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
          }}
          placeholder="Type a message... (Enter to send)"
          rows={1}
          className="flex-1 bg-void/70 border border-border rounded-xl px-4 py-2.5
            text-bright placeholder-soft/35 text-sm
            focus:outline-none focus:border-accent/40
            transition-all resize-none leading-relaxed"
          style={{ minHeight: '42px', maxHeight: '120px' }}
        />

        {/* Send */}
        <button
          ref={sendRef}
          type="submit"
          disabled={!canSend}
          className={`flex-shrink-0 p-2.5 rounded-xl border transition-all duration-200 ${
            canSend
              ? 'bg-accent/15 border-accent/40 text-accent hover:bg-accent/25 hover:shadow-glow-sm'
              : 'bg-transparent border-border text-soft/30 cursor-not-allowed'
          }`}
        >
          <Send size={17} className={canSend ? 'translate-x-px' : ''} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
