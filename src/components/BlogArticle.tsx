const preparationSteps = [
  "มีบัญชี Cloudflare และ GitHub หรือ GitLab",
  "โปรเจค React/Vite build ได้สำเร็จในเครื่อง",
  "โค้ดถูก push ขึ้น repository แล้ว",
  "รู้ production branch ของโปรเจค เช่น main หรือ master",
];

const gitDeploySteps = [
  {
    title: "เข้า Cloudflare Dashboard",
    body: "ไปที่ Workers & Pages แล้วกด Create application เลือก Pages จากนั้นเลือก Connect to Git หรือ Import an existing Git repository",
  },
  {
    title: "เชื่อม Git provider",
    body: "เลือก GitHub หรือ GitLab แล้วอนุญาตให้ Cloudflare เข้าถึง repository ที่ต้องการ deploy ถ้าเป็น organization ให้เลือก scope ให้ถูกต้อง",
  },
  {
    title: "เลือก repository",
    body: "เลือก repo ของโปรเจค portfolio หรือเว็บที่ต้องการ deploy จากนั้นกด Begin setup",
  },
  {
    title: "ตั้งค่า build",
    body: "สำหรับ React ที่สร้างด้วย Vite ให้ใช้ Production branch เป็น main, Build command เป็น npm run build และ Build output directory เป็น dist",
  },
  {
    title: "กด Save and Deploy",
    body: "Cloudflare จะติดตั้ง dependencies, run build command และอัปโหลดไฟล์ใน dist ขึ้น Pages โดยอัตโนมัติ",
  },
];

const troubleshootingItems = [
  {
    problem: "Build failed เพราะหา package ไม่เจอ",
    fix: "ตรวจสอบว่า package.json และ package-lock.json ถูก push แล้ว จากนั้นลอง npm install และ npm run build ในเครื่องก่อน",
  },
  {
    problem: "หน้าเว็บขาวหลัง deploy",
    fix: "เช็กว่า Build output directory ตั้งเป็น dist และไม่มี base path ผิดใน vite.config.ts",
  },
  {
    problem: "Environment variable ไม่ทำงาน",
    fix: "ตัวแปรฝั่ง client ของ Vite ต้องขึ้นต้นด้วย VITE_ เช่น VITE_API_URL และต้องตั้งทั้ง Production/Preview ตามที่ใช้งาน",
  },
  {
    problem: "Deploy แล้ว route ย่อย refresh ไม่เจอ",
    fix: "ถ้าเป็น SPA ให้เพิ่มไฟล์ public/_redirects ที่มีบรรทัด /* /index.html 200 หรือใช้ config ที่ framework รองรับ",
  },
];

export default function BlogArticle() {
  return (
    <article id="deploy-cloudflare-pages" className="blog-article">
      <header className="blog-hero">
        <p className="blog-kicker">Deployment Guide</p>
        <h1>การ Deploy โปรเจค โดยใช้ Cloudflare Pages</h1>
        <p className="blog-subtitle">
          คู่มือแบบลงมือทำจริงสำหรับนำเว็บ React/Vite หรือ static frontend ขึ้นออนไลน์ด้วย Cloudflare Pages
          ตั้งแต่เตรียมโปรเจค เชื่อม Git ตั้งค่า build ไปจนถึง custom domain และวิธีแก้ปัญหาที่พบบ่อย
        </p>

        <div className="blog-author">
          <div className="blog-avatar" aria-hidden="true">
            ST
          </div>
          <div>
            <p className="blog-author-name">Sirawit Tathip</p>
            <p className="blog-meta">12 min read · Updated Jun 9, 2026</p>
          </div>
        </div>
      </header>

      <section>
        <p>
          Cloudflare Pages คือบริการ deploy เว็บไซต์ frontend และ static site บน edge network ของ Cloudflare
          เหมาะกับโปรเจคอย่าง React, Vite, Vue, Svelte, Astro หรือเว็บ HTML/CSS/JS ธรรมดา จุดแข็งคือเชื่อมกับ Git ได้
          เมื่อ push โค้ดขึ้น branch ที่กำหนด Cloudflare จะ build และ deploy ให้ทันที พร้อมสร้าง preview URL สำหรับ branch
          หรือ pull request เพื่อทดสอบก่อนปล่อยขึ้น production
        </p>

        <p>
          บทความนี้เขียนให้ทำตามได้ทีละขั้น ถ้าให้ AI agent อ่านเพื่อช่วย deploy ให้ใช้หัวข้อ "Agent checklist"
          ด้านล่างเป็นลำดับงานหลักได้เลย
        </p>
      </section>

      <section>
        <h2>ภาพรวมสิ่งที่จะทำ</h2>
        <ol>
          <li>ตรวจว่าโปรเจค build ผ่านในเครื่อง</li>
          <li>push โค้ดขึ้น GitHub หรือ GitLab</li>
          <li>สร้าง Cloudflare Pages project และเชื่อม repository</li>
          <li>ตั้งค่า build command และ output directory</li>
          <li>deploy และตรวจ URL ที่ได้จาก pages.dev</li>
          <li>ตั้ง environment variables และ custom domain ถ้าจำเป็น</li>
        </ol>
      </section>

      <section>
        <h2>เตรียมโปรเจคก่อน Deploy</h2>
        <p>
          ก่อนเข้า Cloudflare ให้ทำให้โปรเจคพร้อมก่อน เพราะปัญหาส่วนใหญ่เกิดจาก build ในเครื่องยังไม่ผ่าน
          หรือ output directory ตั้งไม่ตรงกับ framework
        </p>

        <ul>
          {preparationSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>

        <p>รันคำสั่งนี้จาก root ของโปรเจค:</p>

        <pre>
          <code>{`npm install
npm run build`}</code>
        </pre>

        <p>
          สำหรับ Vite เมื่อ build สำเร็จจะได้โฟลเดอร์ <code>dist</code> ซึ่งเป็นไฟล์พร้อม deploy
          ถ้าใช้ framework อื่น output อาจเป็น <code>build</code>, <code>out</code> หรือ <code>public</code>
          ให้ดูจาก documentation ของ framework นั้น
        </p>
      </section>

      <section>
        <h2>วิธีที่แนะนำ: Deploy ผ่าน Git Integration</h2>
        <p>
          วิธีนี้เหมาะที่สุดสำหรับเว็บส่วนตัวหรือโปรเจคที่ต้องอัปเดตบ่อย เพราะ Cloudflare จะ deploy ให้ทุกครั้งที่ push
          โค้ดขึ้น production branch และยังมี preview deployment สำหรับ branch อื่นด้วย
        </p>

        <div className="blog-steps">
          {gitDeploySteps.map((step, index) => (
            <div className="blog-step" key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h3>ค่าที่ต้องใส่สำหรับ React/Vite</h3>
        <table>
          <tbody>
            <tr>
              <th>Production branch</th>
              <td>
                <code>main</code>
              </td>
            </tr>
            <tr>
              <th>Build command</th>
              <td>
                <code>npm run build</code>
              </td>
            </tr>
            <tr>
              <th>Build output directory</th>
              <td>
                <code>dist</code>
              </td>
            </tr>
            <tr>
              <th>Root directory</th>
              <td>เว้นว่างไว้ ถ้าโปรเจคอยู่ที่ root ของ repository</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Deploy แบบ Direct Upload ด้วย Wrangler</h2>
        <p>
          ถ้าไม่อยากเชื่อม Git หรืออยาก deploy จากเครื่อง/CI ของตัวเอง ใช้ Wrangler ได้ วิธีนี้จะอัปโหลดไฟล์ที่ build แล้วขึ้น
          Pages โดยตรง
        </p>

        <pre>
          <code>{`npm run build
npx wrangler login
npx wrangler pages project create
npx wrangler pages deploy dist`}</code>
        </pre>

        <p>
          ถ้าต้องการ deploy เป็น preview branch ให้ระบุ branch:
        </p>

        <pre>
          <code>{`npx wrangler pages deploy dist --branch=feature-blog`}</code>
        </pre>

        <p>
          หมายเหตุสำคัญ: ตอนสร้าง project ต้องเลือกแนวทางให้ดี เพราะ project ที่เริ่มด้วย Direct Upload
          ไม่สามารถเปลี่ยนไปเป็น Git Integration project เดิมได้ภายหลัง ต้องสร้าง project ใหม่ถ้าจะเปลี่ยนวิธีหลัก
        </p>
      </section>

      <section>
        <h2>ตั้งค่า Environment Variables</h2>
        <p>
          ถ้าเว็บมี API URL, public key หรือ config ที่ไม่ควร hardcode ให้ไปที่ Pages project แล้วเปิด Settings,
          Environment variables จากนั้นเพิ่มตัวแปรใน Production และ Preview ให้ตรงกัน
        </p>

        <pre>
          <code>{`VITE_API_URL=https://api.example.com
VITE_PUBLIC_SITE_URL=https://your-domain.com`}</code>
        </pre>

        <p>
          สำหรับ Vite ตัวแปรที่ต้องอ่านจากฝั่ง browser ต้องขึ้นต้นด้วย <code>VITE_</code>
          และหลังแก้ environment variables ควร redeploy เพื่อให้ build ใหม่รับค่าเข้าไป
        </p>
      </section>

      <section>
        <h2>เพิ่ม Custom Domain</h2>
        <p>
          หลัง deploy สำเร็จ Cloudflare จะให้ URL รูปแบบ <code>project-name.pages.dev</code>
          ถ้าต้องการใช้โดเมนของตัวเอง ให้เข้า Pages project, เลือก Custom domains, กด Set up a custom domain
          แล้วใส่โดเมน เช่น <code>www.example.com</code>
        </p>

        <p>
          ถ้าโดเมนอยู่ใน Cloudflare อยู่แล้ว ระบบจะช่วยเพิ่ม DNS record ให้ ถ้าโดเมนอยู่ข้างนอก ให้ทำตามค่า DNS
          ที่ Cloudflare แสดง แล้วรอ propagation จากนั้นทดสอบเปิดเว็บด้วย HTTPS
        </p>
      </section>

      <section>
        <h2>Agent checklist</h2>
        <p>สำหรับ AI agent หรือใครที่ต้องการทำงานแบบเป็นขั้นตอน ให้ใช้ checklist นี้:</p>

        <pre>
          <code>{`1. Inspect package.json and identify framework.
2. Run npm install if dependencies are missing.
3. Run npm run build and confirm the output directory.
4. For Vite/React, use build command: npm run build.
5. For Vite/React, use output directory: dist.
6. Push code to GitHub or GitLab.
7. Create Cloudflare Pages project from Git integration.
8. Select production branch: main unless the repository uses another branch.
9. Add required environment variables in Cloudflare Pages settings.
10. Deploy, open the pages.dev URL, and verify the rendered page.
11. If custom domain is required, add it under Custom domains and verify DNS/HTTPS.
12. Record the production URL and preview URL for future releases.`}</code>
        </pre>
      </section>

      <section>
        <h2>ปัญหาที่พบบ่อย</h2>
        <div className="blog-troubleshooting">
          {troubleshootingItems.map((item) => (
            <div key={item.problem}>
              <h3>{item.problem}</h3>
              <p>{item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>สรุป</h2>
        <p>
          ถ้าเป็นโปรเจค React/Vite ให้จำสามค่านี้ไว้: production branch คือ <code>main</code>,
          build command คือ <code>npm run build</code> และ output directory คือ <code>dist</code>
          จากนั้นเลือก deploy ผ่าน Git Integration เพื่อให้ทุกครั้งที่ push โค้ด Cloudflare Pages build และปล่อยเว็บให้เอง
          ส่วน Direct Upload เหมาะกับงานที่อยากควบคุม build pipeline เองหรือ deploy จากเครื่องโดยตรง
        </p>
      </section>

      <footer className="blog-footer">
        <p>References: Cloudflare Pages documentation, React/Vite framework guide, and Wrangler Direct Upload guide.</p>
      </footer>
    </article>
  );
}
