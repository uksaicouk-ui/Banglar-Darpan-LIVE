import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { Link, Redirect, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ClerkProvider, SignIn, SignUp, useAuth, useClerk, useUser } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import {
  ArrowLeft,
  ChevronRight,
  FileVideo,
  FolderOpen,
  Fullscreen,
  Library,
  Link2,
  Maximize2,
  Mic2,
  Pause,
  Pencil,
  Play,
  Plus,
  Radio,
  RotateCcw,
  Save,
  Settings2,
  ShieldCheck,
  Trash2,
  UploadCloud,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

type Channel = { id: string; title: string; url: string };
type Source = { kind: 'youtube' | 'video' | 'hls'; url: string; label: string };

const DEFAULT_CHANNELS: Channel[] = [
  { id: 'hasina-orders', title: "36 Days in July: Sheikh Hasina's Secret Orders Revealed", url: 'https://www.youtube.com/watch?v=dt2-E-RkGVI' },
  { id: 'tribunal-sentences', title: 'Bangladesh Tribunal Sentences Ex-PM Sheikh Hasina', url: 'https://www.youtube.com/watch?v=3chAKMcC61k' },
  { id: 'halt-protests', title: "Sheikh Hasina's Orders to Halt Protests Revealed", url: 'https://www.youtube.com/watch?v=HqmtEzyOTaE' },
  { id: 'ousted-report', title: 'Bangladesh Ousted Ex-PM Sheikh Hasina Report', url: 'https://www.youtube.com/watch?v=u1fGtEekdfY' },
];
const STORAGE_KEY = 'banglar-darpan-channels';
const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

function stripBase(path: string) {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsPlacement: 'top' as const,
    socialButtonsVariant: 'blockButton' as const,
  },
  variables: {
    colorPrimary: '#d85b3f',
    colorForeground: '#f5f0df',
    colorMutedForeground: '#a8a9b7',
    colorDanger: '#ff8f79',
    colorBackground: '#15172a',
    colorInput: '#0f1120',
    colorInputForeground: '#f5f0df',
    colorNeutral: '#45465a',
    fontFamily: 'Manrope, sans-serif',
    borderRadius: '0.7rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#15172a] rounded-2xl w-[440px] max-w-full overflow-hidden',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-[#f5f0df] font-semibold',
    headerSubtitle: 'text-[#a8a9b7]',
    socialButtonsBlockButtonText: 'text-[#f5f0df]',
    formFieldLabel: 'text-[#d8d5cb]',
    footerActionLink: 'text-[#ffe082]',
    footerActionText: 'text-[#a8a9b7]',
    dividerText: 'text-[#a8a9b7]',
    identityPreviewEditButton: 'text-[#ffe082]',
    formFieldSuccessText: 'text-[#81c995]',
    alertText: 'text-[#ffb4a4]',
    logoBox: 'h-16',
    logoImage: 'max-h-16',
    socialButtonsBlockButton: 'border-[#45465a] bg-[#202238] hover:bg-[#2a2c45]',
    formButtonPrimary: 'bg-[#d85b3f] hover:bg-[#ef7456] text-[#fff8ed]',
    formFieldInput: 'border-[#45465a] bg-[#0f1120] text-[#f5f0df]',
    footerAction: 'border-t border-[#35364b]',
    dividerLine: 'bg-[#35364b]',
    alert: 'border-[#75483f] bg-[#2a1c23]',
    otpCodeFieldInput: 'border-[#45465a] bg-[#0f1120] text-[#f5f0df]',
    formFieldRow: 'text-[#d8d5cb]',
    main: 'bg-transparent',
  },
};

function readChannels(): Channel[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Channel[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // A malformed local value should never take the newsroom offline.
  }
  return DEFAULT_CHANNELS;
}

function isYoutube(url: string) { return /(?:youtube\.com|youtu\.be)/i.test(url); }
function youtubeId(url: string) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^?&/]+)/i);
  return match?.[1] ?? '';
}
function sourceFor(url: string, label: string): Source {
  const trimmed = url.trim();
  if (isYoutube(trimmed)) return { kind: 'youtube', url: trimmed, label };
  if (/\.m3u8(?:$|[?#])/i.test(trimmed)) return { kind: 'hls', url: trimmed, label };
  return { kind: 'video', url: trimmed, label };
}
function formatKind(source: Source) {
  return source.kind === 'youtube' ? 'YOUTUBE REPORT' : source.kind === 'hls' ? 'HLS STREAM' : 'DIRECT VIDEO';
}

function Brand() {
  return (
    <Link href="/" className="bd-brand" data-testid="link-home">
      <span className="bd-mark" aria-hidden="true" />
      <span><span className="bd-brand-title">BANGLAR <b>DARPAN</b></span><span className="bd-brand-sub">live broadcast desk</span></span>
    </Link>
  );
}

function AuthActions() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) return null;

  if (isSignedIn) {
    const name = user?.firstName || user?.emailAddresses[0]?.emailAddress || 'Account';
    return (
      <div className="bd-auth-actions">
        <span className="bd-auth-user" title={name}>{name}</span>
        <button
          type="button"
          className="bd-auth-button"
          onClick={() => void signOut({ redirectUrl: basePath || '/' })}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="bd-auth-actions">
      <Link href="/sign-in" className="bd-auth-link">Sign in</Link>
      <Link href="/sign-up" className="bd-auth-button">Create account</Link>
    </div>
  );
}

function Header() {
  const [location] = useLocation();
  return (
    <header className="bd-header">
      <Brand />
      <div className="bd-header-actions">
        <span className="bd-live-dot" data-testid="status-live"><i /> LIVE SIGNAL</span>
        <Link href="/test" className={`bd-header-link ${location === '/test' ? 'active' : ''}`} data-testid="link-open-source">
          <UploadCloud size={14} /><span>Open Source Test</span>
        </Link>
        <Link href="/admin" className={`bd-header-link ${location === '/admin' ? 'active' : ''}`} data-testid="link-admin">
          <Settings2 size={14} /><span>Admin</span>
        </Link>
        <AuthActions />
      </div>
    </header>
  );
}

function Sidebar({ channels, selectedId, onSelect }: { channels: Channel[]; selectedId: string; onSelect: (channel: Channel) => void }) {
  return (
    <aside className="bd-sidebar">
      <div className="bd-side-kicker">Curated signal / 04 channels</div>
      <h2 className="bd-side-heading">The default lineup</h2>
      <div className="bd-playlist" data-testid="list-channel-playlist">
        {channels.length ? channels.map((channel, index) => (
          <button
            type="button"
            className={`bd-channel ${selectedId === channel.id ? 'selected' : ''}`}
            key={channel.id}
            onClick={() => onSelect(channel)}
            data-testid={`button-channel-${channel.id}`}
          >
            <span className="bd-channel-index">{String(index + 1).padStart(2, '0')}</span>
            <span><span className="bd-channel-title">{channel.title}</span><span className="bd-channel-meta">NEWS REPORT · READY</span></span>
            <ChevronRight className="bd-chevron" size={15} />
          </button>
        )) : <div className="bd-admin-empty">No channels in the lineup yet.</div>}
      </div>
      <div className="bd-test-card">
        <div className="bd-eyebrow">Community lane</div>
        <p>Bring a stream to the desk. Test YouTube, HLS, MP4, or a local recording without changing the trusted lineup.</p>
        <Link href="/test" className="bd-test-button" data-testid="button-sidebar-test"><UploadCloud size={14} /> Test a stream</Link>
      </div>
    </aside>
  );
}

function useFullscreen(ref: React.RefObject<HTMLDivElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggle = () => {
    if (!document.fullscreenElement) ref.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  useEffect(() => {
    const update = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);
  return { isFullscreen, toggle };
}

function Player({ source }: { source: Source | null }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { isFullscreen, toggle } = useFullscreen(stageRef);

  useEffect(() => {
    setVideoError(false);
    setPlaying(true);
    setMuted(false);
    if (source?.kind !== 'youtube') {
      const video = videoRef.current;
      if (video) {
        video.load();
        void video.play().catch(() => setPlaying(false));
      }
    }
  }, [source]);

  const postYoutube = (command: string) => iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: command, args: [] }), '*');
  const togglePlay = () => {
    if (source?.kind === 'youtube') {
      postYoutube(playing ? 'pauseVideo' : 'playVideo');
    } else if (videoRef.current) {
      if (playing) videoRef.current.pause();
      else void videoRef.current.play();
    }
    setPlaying(!playing);
  };
  const toggleMute = () => {
    if (source?.kind === 'youtube') postYoutube(muted ? 'unMute' : 'mute');
    else if (videoRef.current) videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="bd-stage" ref={stageRef} data-testid="player-stage">
      <div className={`bd-player ${!source ? 'empty' : ''}`}>
        {source?.kind === 'youtube' && youtubeId(source.url) && (
          <iframe
            ref={iframeRef}
            title={source.label}
            src={`https://www.youtube.com/embed/${youtubeId(source.url)}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            data-testid="player-youtube"
          />
        )}
        {source && source.kind !== 'youtube' && (
          <video
            ref={videoRef}
            src={source.url}
            controls={false}
            playsInline
            autoPlay
            muted={muted}
            onError={() => setVideoError(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            data-testid="player-native-video"
          />
        )}
        <div className="bd-player-live"><i /> LIVE</div>
        <div className="bd-watermark" data-testid="text-watermark">বাংলার দর্পণ LIVE</div>
        <div className="bd-empty">
          <Radio size={28} />
          <strong>Signal unavailable</strong>
          <p>Choose a channel or load a test stream to begin.</p>
        </div>
        {videoError && <div className="bd-empty" style={{ display: 'flex' }}><Radio size={28} /><strong>Could not load this stream</strong><p>Check the link and try the test lane again.</p></div>}
        {source && <div className="bd-player-caption"><span>NOW TRANSMITTING</span><strong>{source.label}</strong></div>}
        <div className="bd-player-controls">
          <div className="bd-control-group">
            <button className="bd-control" type="button" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} data-testid="button-player-play">{playing ? <Pause size={15} /> : <Play size={15} />}</button>
            <button className="bd-control" type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} data-testid="button-player-mute">{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button>
            <span className="bd-format">{source ? formatKind(source) : 'STANDBY'}</span>
          </div>
          <button className="bd-control" type="button" onClick={toggle} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'} data-testid="button-player-fullscreen">{isFullscreen ? <MinimizeIcon /> : <Fullscreen size={15} />}</button>
        </div>
      </div>
      <div className="bd-stage-foot">
        <div className="bd-now"><div className="bd-now-label">On air / Banglar Darpan</div><div className="bd-now-title" data-testid="text-now-playing">{source?.label ?? 'Select a report from the lineup'}</div></div>
        <div className="bd-format">{source ? formatKind(source) : 'STANDBY'}</div>
      </div>
    </div>
  );
}

function MinimizeIcon() { return <Maximize2 size={15} style={{ transform: 'rotate(180deg)' }} />; }

function HomePage({ channels }: { channels: Channel[] }) {
  const [selectedId, setSelectedId] = useState(channels[0]?.id ?? '');
  const selected = channels.find((channel) => channel.id === selectedId) ?? channels[0];
  useEffect(() => {
    if (!channels.some((channel) => channel.id === selectedId)) setSelectedId(channels[0]?.id ?? '');
  }, [channels, selectedId]);
  const source = selected ? sourceFor(selected.url, selected.title) : null;
  return (
    <div className="bd-shell">
      <Header />
      <div className="bd-layout">
        <Sidebar channels={channels} selectedId={selected?.id ?? ''} onSelect={(channel) => setSelectedId(channel.id)} />
        <main className="bd-main">
          <div className="bd-main-intro">
            <div><div className="bd-eyebrow">Live newsroom / Dhaka desk</div><h1 className="bd-main-title">The signal stays <em>clear.</em></h1></div>
            <p className="bd-main-note">A focused broadcast window for the stories shaping Bangladesh, curated for the moments that need your full attention.</p>
          </div>
          <Player source={source} />
          <div className="bd-ticker"><span className="bd-ticker-label"><Mic2 size={11} style={{ verticalAlign: 'middle', marginRight: 5 }} /> NEWS DESK</span><span className="bd-ticker-text">Four trusted reports in the default lineup. Community streams stay in the test lane.</span><span className="bd-ticker-time">SIGNAL 04:20 PM</span></div>
        </main>
      </div>
    </div>
  );
}

function TestPage() {
  const [, setLocation] = useLocation();
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('Community test stream');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState('');
  const [source, setSource] = useState<Source | null>(null);

  useEffect(() => () => { if (fileUrl) URL.revokeObjectURL(fileUrl); }, [fileUrl]);
  const acceptFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    if (!nextFile.type.startsWith('video/')) { setStatus('Choose a video file such as MP4, WebM, or MOV.'); return; }
    setFile(nextFile);
    setUrl('');
    setStatus('');
  };
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => acceptFile(event.target.files?.[0]);
  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };
  const playTest = (event: FormEvent) => {
    event.preventDefault();
    setStatus('');
    if (file) {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
      const nextUrl = URL.createObjectURL(file);
      setFileUrl(nextUrl);
      setSource({ kind: 'video', url: nextUrl, label: file.name });
      return;
    }
    if (!url.trim()) { setStatus('Paste a stream URL or choose a local video file first.'); return; }
    if (!isYoutube(url) && !/^https?:\/\//i.test(url)) { setStatus('Enter a full http(s) stream URL.'); return; }
    setSource(sourceFor(url, label.trim() || 'Community test stream'));
  };
  return (
    <div className="bd-shell">
      <Header />
      <main className="bd-main bd-test-page">
        <Link href="/" className="bd-back" data-testid="link-back-lineup"><ArrowLeft size={13} /> BACK TO DEFAULT LINEUP</Link>
        <div className="bd-crumb"><UploadCloud size={12} /> COMMUNITY / OPEN SOURCE TEST</div>
        <div className="bd-main-intro"><div><div className="bd-eyebrow">Bring your signal</div><h1 className="bd-main-title">Test it on the <em>desk.</em></h1></div><p className="bd-main-note">A safe, local testing lane. Nothing here replaces the trusted four-channel lineup.</p></div>
        <div className="bd-form-grid">
          <form className="bd-panel" onSubmit={playTest} data-testid="form-test-stream">
            <h2>Open Source Test</h2><p>Paste a link, or bring a local recording. The player swaps sources immediately when you press play.</p>
            <label className="bd-label" htmlFor="stream-url">Stream URL</label>
            <div style={{ position: 'relative' }}><Link2 size={14} style={{ position: 'absolute', top: 13, left: 13, color: '#77778a' }} /><input id="stream-url" className="bd-input" style={{ paddingLeft: 38 }} value={url} onChange={(event) => { setUrl(event.target.value); setFile(null); }} placeholder="YouTube, https://…/stream.m3u8, or .mp4" data-testid="input-stream-url" /></div>
            <label className="bd-label" htmlFor="stream-label">On-screen label</label>
            <input id="stream-label" className="bd-input" value={label} onChange={(event) => setLabel(event.target.value)} maxLength={80} data-testid="input-stream-label" />
            <div className="bd-form-actions"><button type="submit" className="bd-primary-button" data-testid="button-play-test"><Play size={14} /> Play / Test Stream</button><button type="button" className="bd-secondary-button" onClick={() => { setUrl(''); setFile(null); setSource(null); setStatus(''); }} data-testid="button-clear-test"><RotateCcw size={13} /> Clear</button></div>
            <div className="bd-status" data-testid="status-test-stream">{status}</div>
          </form>
          <div className="bd-panel">
            <h2>Local file</h2><p>Your file stays in this browser session. It is not uploaded to a server.</p>
            <label className={`bd-dropzone ${dragging ? 'dragging' : ''}`} htmlFor="local-video" onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} data-testid="dropzone-local-video">
              <input id="local-video" className="bd-file-input" type="file" accept="video/*" onChange={onFileChange} data-testid="input-local-video" />
              {file ? <><FileVideo size={25} /><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(1)} MB · ready to play</span></> : <><FolderOpen size={25} /><strong>Drop a video here</strong><span>or click to browse from this device</span></>}
            </label>
            <div style={{ marginTop: 14, display: 'flex', gap: 8, color: '#7f7f90', fontSize: 10 }}><ShieldCheck size={13} color="#ffe082" /> MP4, WebM, MOV and browser-supported formats</div>
          </div>
        </div>
        {source && <div style={{ marginTop: 18 }}><Player source={source} /></div>}
        {!source && <div className="bd-panel" style={{ marginTop: 18, textAlign: 'center', padding: '38px 20px' }}><Library size={25} color="#ffe082" /><h2 style={{ marginTop: 10 }}>Test bay is standing by</h2><p style={{ marginBottom: 0 }}>Your preview will appear here with the LIVE badge and Bangla watermark intact.</p></div>}
        <button type="button" className="bd-secondary-button" style={{ marginTop: 18 }} onClick={() => setLocation('/')} data-testid="button-return-default"><ArrowLeft size={13} /> Return to lineup</button>
      </main>
    </div>
  );
}

function AdminPage({ channels, setChannels }: { channels: Channel[]; setChannels: (channels: Channel[]) => void }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formUrl, setFormUrl] = useState('');
  const [error, setError] = useState('');
  const openAdd = () => { setEditingId(null); setFormTitle(''); setFormUrl(''); setError(''); setModalOpen(true); };
  const openEdit = (channel: Channel) => { setEditingId(channel.id); setFormTitle(channel.title); setFormUrl(channel.url); setError(''); setModalOpen(true); };
  const saveChannel = (event: FormEvent) => {
    event.preventDefault();
    if (!formTitle.trim() || !formUrl.trim()) { setError('Both the channel title and stream link are required.'); return; }
    if (!/^https?:\/\//i.test(formUrl.trim())) { setError('Use a full http(s) URL for this lineup.'); return; }
    const next = editingId ? channels.map((channel) => channel.id === editingId ? { ...channel, title: formTitle.trim(), url: formUrl.trim() } : channel) : [...channels, { id: `channel-${Date.now()}`, title: formTitle.trim(), url: formUrl.trim() }];
    setChannels(next); setModalOpen(false);
  };
  const deleteChannel = (id: string) => { if (window.confirm('Remove this channel from the default lineup?')) setChannels(channels.filter((channel) => channel.id !== id)); };
  const resetChannels = () => { if (window.confirm('Reset the lineup to the four original reports?')) setChannels(DEFAULT_CHANNELS); };
  return (
    <div className="bd-shell">
      <Header />
      <main className="bd-main bd-admin-page">
        <Link href="/" className="bd-back" data-testid="link-admin-back"><ArrowLeft size={13} /> BACK TO VIEWER</Link>
        <div className="bd-crumb"><Settings2 size={12} /> CONTROL ROOM / LINEUP MANAGEMENT</div>
        <div className="bd-main-intro"><div><div className="bd-eyebrow">Local control room</div><h1 className="bd-main-title">Manage the <em>lineup.</em></h1></div><p className="bd-main-note">Changes are saved to this browser and are reflected in the live viewer immediately.</p></div>
        <div className="bd-admin-toolbar"><div><div style={{ color: '#b5b3c0', fontSize: 12 }}>{channels.length} {channels.length === 1 ? 'channel' : 'channels'} configured</div><div style={{ color: '#707083', font: '10px var(--app-font-mono)', marginTop: 5 }}>LOCAL STORAGE · NO ACCOUNT REQUIRED</div></div><div style={{ display: 'flex', gap: 8 }}><button type="button" className="bd-secondary-button" onClick={resetChannels} data-testid="button-reset-lineup"><RotateCcw size={13} /> Reset originals</button><button type="button" className="bd-primary-button" onClick={openAdd} data-testid="button-add-channel"><Plus size={14} /> Add channel</button></div></div>
        <div className="bd-admin-table" data-testid="list-admin-channels">
          <div className="bd-admin-row head"><span>NO.</span><span>CHANNEL</span><span>STREAM LINK</span><span>ACTIONS</span></div>
          {channels.length ? channels.map((channel, index) => <div className="bd-admin-row" key={channel.id} data-testid={`row-admin-channel-${channel.id}`}><span className="bd-admin-index">{String(index + 1).padStart(2, '0')}</span><span className="bd-admin-name">{channel.title}</span><span className="bd-admin-url" title={channel.url}>{channel.url}</span><span className="bd-admin-actions"><button type="button" className="bd-icon-button" onClick={() => openEdit(channel)} aria-label={`Edit ${channel.title}`} data-testid={`button-edit-channel-${channel.id}`}><Pencil size={13} /></button><button type="button" className="bd-icon-button danger" onClick={() => deleteChannel(channel.id)} aria-label={`Delete ${channel.title}`} data-testid={`button-delete-channel-${channel.id}`}><Trash2 size={13} /></button></span></div>) : <div className="bd-admin-empty">The lineup is empty. Add a channel or reset the original four.</div>}
        </div>
        <div className="bd-panel" style={{ marginTop: 18, display: 'flex', gap: 12, alignItems: 'start' }}><ShieldCheck size={17} color="#ffe082" /><div><h2 style={{ fontSize: 14 }}>A quiet, local control room</h2><p style={{ margin: '5px 0 0' }}>This first build uses localStorage only. There is no backend or external authentication, so lineup edits stay on this device.</p></div></div>
      </main>
      {modalOpen && <div className="bd-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}><form className="bd-modal" onSubmit={saveChannel} data-testid="form-channel"><div className="bd-modal-head"><div><div className="bd-eyebrow">{editingId ? 'Edit channel' : 'New channel'}</div><h2>{editingId ? 'Tune this signal' : 'Add to lineup'}</h2></div><button type="button" className="bd-icon-button" onClick={() => setModalOpen(false)} aria-label="Close editor" data-testid="button-close-editor"><X size={15} /></button></div><label className="bd-label" htmlFor="channel-title">Channel title</label><input id="channel-title" className="bd-input" value={formTitle} onChange={(event) => setFormTitle(event.target.value)} placeholder="A clear report title" data-testid="input-channel-title" /><label className="bd-label" htmlFor="channel-url">Stream link</label><input id="channel-url" className="bd-input" value={formUrl} onChange={(event) => setFormUrl(event.target.value)} placeholder="https://www.youtube.com/watch?v=…" data-testid="input-channel-url" /><div className="bd-status" style={{ marginTop: 12 }}>{error}</div><div className="bd-form-actions" style={{ justifyContent: 'end' }}><button type="button" className="bd-secondary-button" onClick={() => setModalOpen(false)} data-testid="button-cancel-editor">Cancel</button><button type="submit" className="bd-primary-button" data-testid="button-save-channel"><Save size={14} /> Save channel</button></div></form></div>}
    </div>
  );
}

function SignInPage() {
  return (
    <div className="bd-auth-page">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
        fallbackRedirectUrl={`${basePath}/user-portal`}
        appearance={clerkAppearance}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="bd-auth-page">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
        fallbackRedirectUrl={`${basePath}/user-portal`}
        appearance={clerkAppearance}
      />
    </div>
  );
}

function AuthLoadingPage() {
  return (
    <div className="bd-auth-loading">
      <span className="bd-mark" aria-hidden="true" />
      <p>Connecting to the broadcast desk…</p>
    </div>
  );
}

function HomeRedirect({ channels }: { channels: Channel[] }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <AuthLoadingPage />;
  return isSignedIn ? <Redirect to="/user-portal" /> : <HomePage channels={channels} />;
}

function UserPortalPage({ channels }: { channels: Channel[] }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <AuthLoadingPage />;
  return isSignedIn ? <HomePage channels={channels} /> : <Redirect to="/" />;
}

function AdminGate({
  channels,
  setChannels,
}: {
  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return <AuthLoadingPage />;
  return isSignedIn ? (
    <AdminPage channels={channels} setChannels={setChannels} />
  ) : (
    <Redirect to="/sign-in" />
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const client = useQueryClient();
  const previousUserId = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const nextUserId = user?.id ?? null;
      if (
        previousUserId.current !== undefined &&
        previousUserId.current !== nextUserId
      ) {
        client.clear();
      }
      previousUserId.current = nextUserId;
    });
    return unsubscribe;
  }, [addListener, client]);

  return null;
}

function AppRouter() {
  const [channels, setChannelsState] = useState<Channel[]>(readChannels);
  const [location] = useLocation();
  const setChannels = (next: Channel[]) => { setChannelsState(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); };
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route path="/test" component={TestPage} />
        <Route path="/admin">{() => <AdminGate channels={channels} setChannels={setChannels} />}</Route>
        <Route path="/user-portal">{() => <UserPortalPage channels={channels} />}</Route>
        <Route path="/">{() => <HomeRedirect channels={channels} />}</Route>
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: 'Welcome back to the desk',
            subtitle: 'Sign in to manage your Banglar Darpan lineup',
          },
        },
        signUp: {
          start: {
            title: 'Create your desk account',
            subtitle: 'Save your access to the Banglar Darpan control room',
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <AppRouter />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default function App() {
  if (!clerkPubKey) {
    throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in the environment.');
  }

  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}