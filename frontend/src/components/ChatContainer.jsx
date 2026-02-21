import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import Avatar from './Avatar.jsx';
import { formatMessageTime, formatMessageDate } from '../lib/utils.js';

// ─── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonMsg = ({ mine }) => (
  <div className={`flex items-end gap-2 ${mine ? 'flex-row-reverse' : ''}`}>
    {!mine && <div className="w-9 h-9 rounded-full skeleton flex-shrink-0" />}
    <div className={`space-y-1 flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
      <div className={`h-10 skeleton rounded-2xl ${mine ? 'w-44' : 'w-56'}`} />
    </div>
  </div>
);

// ─── Single Message ─────────────────────────────────────────────────────────────
const Message = ({ msg, authUser, prevMsg }) => {
  const isMine = msg.senderId === authUser._id;
  const ref = useRef(null);

  // Only show avatar if different sender than prev message
  const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId;

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 12, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'back.out(1.4)' }
    );
  }, []);

  return (
    <div ref={ref} className={`flex items-end gap-2 ${isMine ? 'flex-row-reverse' : ''}`}>
      {/* Avatar placeholder to keep alignment */}
      <div className="w-9 flex-shrink-0">
        {!isMine && showAvatar && (
          <Avatar user={{ _id: msg.senderId }} size="sm" />
        )}
      </div>

      <div className={`flex flex-col gap-1 max-w-xs lg:max-w-md xl:max-w-lg ${isMine ? 'items-end' : 'items-start'}`}>
        {msg.image && (
          <img
            src={msg.image}
            alt="attachment"
            className="max-w-xs rounded-2xl border border-border/60 object-cover shadow-lg cursor-zoom-in hover:opacity-95 transition-opacity"
          />
        )}
        {msg.text && (
          <div className={`px-4 py-2.5 text-sm leading-relaxed ${isMine ? 'bubble-sent' : 'bubble-recv'}`}>
            {msg.text}
          </div>
        )}
        <span className="text-[10px] text-soft/40 font-mono px-1">
          {formatMessageTime(msg.createdAt)}
        </span>
      </div>
    </div>
  );
};

// ─── Main Container ─────────────────────────────────────────────────────────────
const ChatContainer = () => {
  const {
    messages, getMessages, isMessagesLoading,
    selectedUser, subscribeToMessages, unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Group by date
  const groups = messages.reduce((acc, msg) => {
    const d = formatMessageDate(msg.createdAt);
    if (!acc[d]) acc[d] = [];
    acc[d].push(msg);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChatHeader />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {isMessagesLoading ? (
          <div className="space-y-5 pt-2">
            <SkeletonMsg mine={false} />
            <SkeletonMsg mine />
            <SkeletonMsg mine={false} />
            <SkeletonMsg mine />
            <SkeletonMsg mine={false} />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/6 border border-accent/12 flex items-center justify-center mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <p className="font-display font-semibold text-bright text-base">Say hello!</p>
            <p className="text-soft text-sm mt-1">Start your conversation with {selectedUser?.fullName}</p>
          </div>
        ) : (
          Object.entries(groups).map(([date, msgs]) => (
            <div key={date}>
              {/* Date divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border/60" />
                <span className="text-[10px] text-soft/50 font-mono bg-void/80 px-3 py-1 rounded-full border border-border/40">
                  {date}
                </span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div className="space-y-1.5">
                {msgs.map((msg, i) => (
                  <Message
                    key={msg._id}
                    msg={msg}
                    authUser={authUser}
                    prevMsg={i > 0 ? msgs[i - 1] : null}
                  />
                ))}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
