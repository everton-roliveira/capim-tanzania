import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const CONCEPTS = [
  {
    id: 0,
    nome: "Tanque Pressurizado",
    desc: "Cilindro cápsula com faixas de alerta, válvula e visor de líquido emissivo com slosh.",
  },
  {
    id: 1,
    nome: "Célula Sci-fi",
    desc: "Cartucho de vidro com líquido luminoso borbulhando, tampas metálicas e alça.",
  },
  {
    id: 2,
    nome: "Esfera Criogênica",
    desc: "Esfera metálica em gomos, congelada, soltando vapor frio com anel de LED.",
  },
];

export default function App() {
  const mountRef = useRef(null);
  const sceneDataRef = useRef(null);
  const [selecionado, setSelecionado] = useState(0);
  const selRef = useRef(0);
  selRef.current = selecionado;

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e14);
    scene.fog = new THREE.Fog(0x0a0e14, 8, 20);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 1.6, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Luzes
    scene.add(new THREE.AmbientLight(0x334455, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(4, 6, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4488ff, 0.5);
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    // Chão
    const chao = new THREE.Mesh(
      new THREE.CircleGeometry(6, 48),
      new THREE.MeshStandardMaterial({ color: 0x131a24, roughness: 0.9 })
    );
    chao.rotation.x = -Math.PI / 2;
    chao.position.y = -1.1;
    scene.add(chao);

    // Grid sutil
    const grid = new THREE.GridHelper(12, 24, 0x1e2a3a, 0x16202e);
    grid.position.y = -1.09;
    scene.add(grid);

    const metal = (color, rough = 0.35, met = 0.9) =>
      new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: met });

    // ============ CONCEITO 1: Tanque pressurizado ============
    const g1 = new THREE.Group();
    {
      const corpo = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 1.4, 32),
        metal(0xb8bec8, 0.3)
      );
      g1.add(corpo);
      const topo = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), metal(0xb8bec8, 0.3));
      topo.position.y = 0.7;
      g1.add(topo);
      const fundo = topo.clone();
      fundo.rotation.x = Math.PI;
      fundo.position.y = -0.7;
      g1.add(fundo);

      // Faixas de alerta amarelas
      [-0.45, 0.45].forEach((y) => {
        const faixa = new THREE.Mesh(
          new THREE.CylinderGeometry(0.565, 0.565, 0.14, 32),
          new THREE.MeshStandardMaterial({ color: 0xf2b705, roughness: 0.5, metalness: 0.2 })
        );
        faixa.position.y = y;
        g1.add(faixa);
      });

      // Visor de líquido (janela)
      const visorLiq = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.7, 20),
        new THREE.MeshStandardMaterial({
          color: 0x00e5ff,
          emissive: 0x00c8e8,
          emissiveIntensity: 1.6,
          roughness: 0.1,
        })
      );
      visorLiq.position.set(0, 0, 0.42);
      g1.add(visorLiq);
      const aroVisor = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 12, 24), metal(0x555c66, 0.4));
      aroVisor.position.set(0, 0.35, 0.52);
      aroVisor.rotation.x = 0;
      g1.userData.slosh = visorLiq;

      // Válvula no topo
      const valvula = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16), metal(0x8a3030, 0.4, 0.6));
      valvula.position.y = 1.25;
      g1.add(valvula);
      const roda = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 10, 24), metal(0xcc4444, 0.4, 0.5));
      roda.rotation.x = Math.PI / 2;
      roda.position.y = 1.42;
      g1.add(roda);
      g1.userData.roda = roda;

      // Luz do visor
      const pl = new THREE.PointLight(0x00d5f5, 1.2, 3);
      pl.position.set(0, 0, 0.8);
      g1.add(pl);
    }

    // ============ CONCEITO 2: Célula sci-fi ============
    const g2 = new THREE.Group();
    {
      // Vidro
      const vidro = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 1.2, 24, 1, true),
        new THREE.MeshStandardMaterial({
          color: 0x88ffcc,
          transparent: true,
          opacity: 0.22,
          roughness: 0.05,
          metalness: 0.1,
          side: THREE.DoubleSide,
        })
      );
      g2.add(vidro);

      // Líquido interno
      const liquido = new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.36, 0.95, 24),
        new THREE.MeshStandardMaterial({
          color: 0x2bff88,
          emissive: 0x1de07a,
          emissiveIntensity: 1.8,
          transparent: true,
          opacity: 0.85,
          roughness: 0.2,
        })
      );
      liquido.position.y = -0.1;
      g2.add(liquido);
      g2.userData.liquido = liquido;

      // Bolhas
      const bolhas = [];
      const bolhaMat = new THREE.MeshStandardMaterial({
        color: 0xaaffdd,
        emissive: 0x66ffbb,
        emissiveIntensity: 1.2,
        transparent: true,
        opacity: 0.8,
      });
      for (let i = 0; i < 10; i++) {
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.03 + Math.random() * 0.03, 8, 8), bolhaMat);
        b.position.set((Math.random() - 0.5) * 0.5, -0.5 + Math.random(), (Math.random() - 0.5) * 0.5);
        b.userData.v = 0.15 + Math.random() * 0.25;
        g2.add(b);
        bolhas.push(b);
      }
      g2.userData.bolhas = bolhas;

      // Tampas metálicas
      [0.72, -0.72].forEach((y) => {
        const tampa = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.24, 24), metal(0x4a525e, 0.35));
        tampa.position.y = y;
        g2.add(tampa);
      });

      // Alça
      const alca = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.045, 10, 24, Math.PI), metal(0x6b7480, 0.4));
      alca.position.y = 0.86;
      g2.add(alca);

      // Hastes laterais
      [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].forEach((a) => {
        const h = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.42, 8), metal(0x3a424e, 0.4));
        h.position.set(Math.cos(a) * 0.46, 0, Math.sin(a) * 0.46);
        g2.add(h);
      });

      const pl = new THREE.PointLight(0x2bff88, 1.4, 3.5);
      g2.add(pl);
    }

    // ============ CONCEITO 3: Esfera criogênica ============
    const g3 = new THREE.Group();
    {
      const esfera = new THREE.Mesh(
        new THREE.SphereGeometry(0.75, 32, 24),
        new THREE.MeshStandardMaterial({ color: 0xdde6ee, roughness: 0.25, metalness: 0.85 })
      );
      g3.add(esfera);

      // Gomos (anéis meridianos)
      for (let i = 0; i < 4; i++) {
        const anel = new THREE.Mesh(new THREE.TorusGeometry(0.755, 0.022, 8, 48), metal(0x9aa8b8, 0.4));
        anel.rotation.y = (i * Math.PI) / 4;
        g3.add(anel);
      }
      const equador = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.03, 8, 48), metal(0x8895a5, 0.4));
      equador.rotation.x = Math.PI / 2;
      g3.add(equador);

      // Anel de LED
      const led = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.035, 8, 40),
        new THREE.MeshStandardMaterial({
          color: 0x66ccff,
          emissive: 0x44bbff,
          emissiveIntensity: 2.0,
        })
      );
      led.rotation.x = Math.PI / 2;
      led.position.y = -0.55;
      g3.add(led);
      g3.userData.led = led;

      // Válvula superior
      const bocal = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.3, 16), metal(0x6b7684, 0.35));
      bocal.position.y = 0.85;
      g3.add(bocal);

      // Placas de gelo (frost) — pequenos patches claros
      const frostMat = new THREE.MeshStandardMaterial({
        color: 0xeaf6ff,
        roughness: 0.95,
        metalness: 0,
        transparent: true,
        opacity: 0.75,
      });
      for (let i = 0; i < 14; i++) {
        const f = new THREE.Mesh(new THREE.SphereGeometry(0.16 + Math.random() * 0.12, 8, 6), frostMat);
        const th = Math.random() * Math.PI;
        const ph = Math.random() * Math.PI * 2;
        f.position.setFromSphericalCoords(0.72, th, ph);
        f.scale.z = 0.25;
        f.lookAt(0, 0, 0);
        g3.add(f);
      }

      // Vapor frio (partículas)
      const vaporMat = new THREE.MeshBasicMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.28 });
      const vapores = [];
      for (let i = 0; i < 12; i++) {
        const v = new THREE.Mesh(new THREE.SphereGeometry(0.09 + Math.random() * 0.1, 8, 8), vaporMat.clone());
        v.userData.seed = Math.random() * 10;
        g3.add(v);
        vapores.push(v);
      }
      g3.userData.vapores = vapores;

      const pl = new THREE.PointLight(0x66ccff, 0.9, 3);
      pl.position.y = -0.4;
      g3.add(pl);
    }

    const grupos = [g1, g2, g3];
    grupos.forEach((g, i) => {
      g.position.x = (i - 1) * 2.6;
      g.position.y = 0.1;
      scene.add(g);

      // Base/pedestal
      const ped = new THREE.Mesh(
        new THREE.CylinderGeometry(0.95, 1.05, 0.18, 32),
        metal(0x1c2632, 0.6, 0.4)
      );
      ped.position.set((i - 1) * 2.6, -1.0, 0);
      scene.add(ped);
    });

    // Anel de destaque do selecionado
    const destaque = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.025, 8, 48),
      new THREE.MeshBasicMaterial({ color: 0xffb020 })
    );
    destaque.rotation.x = Math.PI / 2;
    destaque.position.y = -0.98;
    scene.add(destaque);

    sceneDataRef.current = { grupos };

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const sel = selRef.current;

      grupos.forEach((g, i) => {
        const isSel = i === sel;
        g.rotation.y += isSel ? 0.012 : 0.004;
        const alvoY = 0.1 + (isSel ? Math.sin(t * 1.6) * 0.08 + 0.15 : 0);
        g.position.y += (alvoY - g.position.y) * 0.08;
        const alvoEsc = isSel ? 1.12 : 0.92;
        g.scale.setScalar(g.scale.x + (alvoEsc - g.scale.x) * 0.08);
      });

      // Destaque segue o selecionado
      destaque.position.x += ((sel - 1) * 2.6 - destaque.position.x) * 0.12;
      destaque.material.color.setHSL(0.1, 0.9, 0.55 + Math.sin(t * 3) * 0.1);

      // Anim 1: roda da válvula + pulso do visor
      if (g1.userData.roda) g1.userData.roda.rotation.z = t * 0.5;
      if (g1.userData.slosh) {
        g1.userData.slosh.material.emissiveIntensity = 1.4 + Math.sin(t * 2.2) * 0.35;
        g1.userData.slosh.rotation.z = Math.sin(t * 1.8) * 0.06;
      }

      // Anim 2: bolhas subindo + líquido pulsando
      if (g2.userData.bolhas) {
        g2.userData.bolhas.forEach((b) => {
          b.position.y += b.userData.v * 0.016;
          if (b.position.y > 0.42) b.position.y = -0.55;
        });
      }
      if (g2.userData.liquido) {
        g2.userData.liquido.material.emissiveIntensity = 1.6 + Math.sin(t * 3.1) * 0.4;
      }

      // Anim 3: vapor subindo + LED pulsando
      if (g3.userData.vapores) {
        g3.userData.vapores.forEach((v) => {
          const p = ((t * 0.25 + v.userData.seed) % 1.4);
          const ang = v.userData.seed * 2.7;
          v.position.set(
            Math.cos(ang) * (0.5 + p * 0.3),
            -0.6 + p * 0.5 - p * p * 0.1,
            Math.sin(ang) * (0.5 + p * 0.3)
          );
          v.material.opacity = 0.3 * (1 - p / 1.4);
          v.scale.setScalar(0.8 + p * 1.2);
        });
      }
      if (g3.userData.led) {
        g3.userData.led.material.emissiveIntensity = 1.6 + Math.sin(t * 4) * 0.6;
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", background: "#0a0e14", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ padding: "14px 20px 6px" }}>
        <div style={{ color: "#ffb020", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
          Item coletável · Combustível de foguete
        </div>
        <h1 style={{ color: "#e8eef5", fontSize: 20, margin: "4px 0 0", fontWeight: 600 }}>
          3 conceitos 3D — toque para destacar
        </h1>
      </div>

      <div ref={mountRef} style={{ flex: 1, minHeight: 0 }} />

      <div style={{ display: "flex", gap: 8, padding: "10px 12px 16px" }}>
        {CONCEPTS.map((c) => {
          const ativo = selecionado === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelecionado(c.id)}
              style={{
                flex: 1,
                textAlign: "left",
                background: ativo ? "#1c2836" : "#121a25",
                border: ativo ? "1px solid #ffb020" : "1px solid #223044",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              <div style={{ color: ativo ? "#ffb020" : "#9fb2c8", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>
                {c.id + 1}. {c.nome}
              </div>
              <div style={{ color: "#7d8ea3", fontSize: 11, lineHeight: 1.45 }}>{c.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
