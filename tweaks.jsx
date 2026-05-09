/* Tweaks for Pathange portfolio */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5b8cff",
  "aboutGap": 56,
  "aboutPad": 80,
  "portraitFocus": 18,
  "portraitGray": false,
  "marqueeSpeed": 60,
  "orbitOpacity": 0.07,
  "showOrbits": true
}/*EDITMODE-END*/;

function PortfolioTweaks(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(()=>{
    const r = document.documentElement.style;
    r.setProperty('--accent', t.accent);
    r.setProperty('--accent-glow', t.accent + '59');
    r.setProperty('--about-gap', t.aboutGap + 'px');
    r.setProperty('--about-pad', t.aboutPad + 'px');

    const img = document.querySelector('.about-portrait-img');
    if(img){
      img.style.backgroundPosition = `center ${t.portraitFocus}%`;
      img.style.filter = t.portraitGray ? 'grayscale(100%) contrast(1.05)' : 'none';
    }

    const track = document.querySelector('.marquee-track');
    if(track) track.style.animationDuration = t.marqueeSpeed + 's';

    document.querySelectorAll('.hero-orb').forEach((el,i)=>{
      el.style.display = t.showOrbits ? '' : 'none';
      el.style.borderColor = `rgba(91,140,255,${i===0 ? t.orbitOpacity : t.orbitOpacity*0.6})`;
    });
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Brand">
        <TweakColor label="Accent" value={t.accent}
          options={['#5b8cff','#8b6dff','#22c1a3','#ff7a59','#e9c46a']}
          onChange={v=>setTweak('accent', v)} />
      </TweakSection>

      <TweakSection title="About section">
        <TweakSlider label="Section padding" value={t.aboutPad} min={40} max={140} step={4}
          onChange={v=>setTweak('aboutPad', v)} suffix="px" />
        <TweakSlider label="Column gap" value={t.aboutGap} min={24} max={120} step={4}
          onChange={v=>setTweak('aboutGap', v)} suffix="px" />
        <TweakSlider label="Portrait focus" value={t.portraitFocus} min={0} max={60} step={2}
          onChange={v=>setTweak('portraitFocus', v)} suffix="%" />
        <TweakToggle label="Monochrome portrait" value={t.portraitGray}
          onChange={v=>setTweak('portraitGray', v)} />
      </TweakSection>

      <TweakSection title="Motion">
        <TweakSlider label="Marquee speed" value={t.marqueeSpeed} min={20} max={120} step={5}
          onChange={v=>setTweak('marqueeSpeed', v)} suffix="s" />
        <TweakToggle label="Show hero orbits" value={t.showOrbits}
          onChange={v=>setTweak('showOrbits', v)} />
        <TweakSlider label="Orbit opacity" value={t.orbitOpacity} min={0} max={0.25} step={0.01}
          onChange={v=>setTweak('orbitOpacity', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

const tweaksRoot = document.createElement('div');
document.body.appendChild(tweaksRoot);
ReactDOM.createRoot(tweaksRoot).render(<PortfolioTweaks/>);
