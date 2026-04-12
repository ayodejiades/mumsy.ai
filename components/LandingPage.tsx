import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Bell, Users, Baby } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="bg-background overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-32 lg:pt-48 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-7 relative z-10"
          >
            <h1 className="text-pink-600 lg:text-7xl font-headline font-extrabold text-on-surface leading-[1.1] tracking-tight mb-8">
              mumsy.ai
            </h1>
            <p className="text-lg lg:text-xl text-on-surface-variant leading-relaxed max-w-xl mb-10">
              Experience a supportive AI companion that predicts health risks, connects you with CHW specialists, and creates a tailored sanctuary for your maternal journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStart}
                className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/25 active:scale-95"
              >
                Start Your Free Trial
              </button>
              <button
                onClick={onStart}
                className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-xl font-headline font-bold text-lg hover:bg-surface-container-high transition-all active:scale-95"
              >
                View Care Plans
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-5 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/5] bg-surface-container">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKKPqh1zTNQ-yvSp5EE1Ufa3Q76MSxAml26DwFXgPKe9pIu8HtwrNfmsgmL2SLVewDD0_UmESw3ey1GROKJEfYvzGV0PJJFnQb_dE6Ws38yYF_C_WHZ0WL95WoCGMFtVA57XS3DQVQsmkIZkjyUee0xwJujBcP6phXwmISfSew6MSvNCTIH6eMORpebII4PQPqpE9uq7uu5j303h-hHHyRKtUrhAJjQadgOcuO3iTP7-2k9UQofmqfYGssjsuPzklXfh8Sw15WDsQZ"
                alt="Mother and Baby"
              />
            </div>
            {/* Floating Glass UI Elements */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-8 -left-8 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 max-w-[240px] z-20"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">monitor_heart</span>
                <span className="text-xs font-bold font-headline uppercase tracking-widest text-on-surface-variant">Vitals Check</span>
              </div>
              <p className="text-sm font-medium text-on-surface">Health patterns are stable today. Your recovery is on track.</p>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute top-12 -right-6 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 z-20"
            >
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBftUm02k8DfZAiuQYsnhJ6flc25wiFTaaWVOsH9jvXPBhGnRZl3vRSqNSQBmpGzvkKQ4dwbTCYs2m6AXtqiwbN6N0I0HVCiHxd3DGzaJfqJK8MMAbNovZASp9Ab68fruxS4poA-XwbSmpIwK9Xw_Rk1MiS0xG0H719_0Fbow4NV4anQbXf9v0V3YQJbanJWTEuWLokGwPx1gy94yex4EZYrHOGvlcGuLDvS1St1Nz-iMH0r8HtWY86L84YVzuBOzKuFxkS3mnuM_OS" alt="Doctor" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW0Flb6ZCE64UIyGqkmBANoVVXsVpLDnVeVXzZ7xdgTbUjzXcv-a0MK1GOsDxmtqpHFbR2xCtxqzhTcURFBaaffbBYp-TeJYjdcgjEnJtEH58gPiT2HnfLOzW5gEMbOeM1wlqTjDbOZ1PAKKtiLNqGdBrgESoc4Rk0I3JhfEFUhHcwvcbRXCZurY3uxSHMpTsVmZ6N5p2FHCVihna6dhlW0TvxAXkAZ6yawhZfQl7KmYyMJFsZyMzDoeQpTvNRXYRNwLPMdRVI3Nop" alt="CHW" />
              </div>
              <p className="text-[10px] font-bold text-primary mt-2 uppercase">CHW Support Active</p>
            </motion.div>
          </motion.div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary-fixed/30 to-transparent blur-3xl rounded-full translate-x-1/2"></div>
      </section>

      {/* Feature Grid (Bento Style) */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-headline font-bold text-on-surface mb-4">Support that grows with you.</h2>
            <p className="text-on-surface-variant max-w-2xl text-lg">We've combined clinical precision with maternal intuition to provide the most comprehensive digital health companion.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1: Risk Prediction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">troubleshoot</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">Predictive Risk Analysis</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">Our proprietary AI models analyze subtle changes in vitals and behavior to identify potential risks like postpartum hypertension or depression before they become crises.</p>
                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                  Learn about our AI <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-full hidden lg:block translate-y-4 translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500">
                <img
                  className="w-full h-full object-contain object-right-bottom"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfPOBRGAkPcyk-drRioKTeNAfAgqNfbalPwcumnA4Q38JUY-EZfgQWL7on8tEtvGoCj6-tmxKoznew6pBXopEfn5MnfY8ORouc4OLqjJbP24fB-9Xfy9-epvymKoWOW98HYj8vYMZc2sH318VDgN8L8yxJsH2cQsnUq2NmopEF7f5zLEPNwHjNo1UAD1b-56nRPUzJYnb4TniMxYHzPRdVgTzKlTnwAektVdczGWIfaEqwmjauV00iJ13R68an-lz5mOH8U28hink9"
                  alt="AI Visualization"
                />
              </div>
            </motion.div>

            {/* Feature 2: CHW Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 bg-primary text-on-primary p-10 rounded-[2rem] shadow-xl shadow-primary/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-white text-3xl">diversity_1</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">CHW Specialist Access</h3>
                <p className="text-white/80 leading-relaxed">Instant connection to Community Health Workers who understand your context and provide culturally competent care.</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold">24/7</span>
                  <span className="text-sm font-medium leading-tight">Human-led support whenever you need it.</span>
                </div>
              </div>
            </motion.div>

            {/* Small Feature 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 bg-surface-container-highest/50 p-8 rounded-[2rem] border border-outline-variant/10"
            >
              <span className="material-symbols-outlined text-on-surface-variant mb-4">local_library</span>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Curated Knowledge</h4>
              <p className="text-sm text-on-surface-variant">Evidence-based insights tailored to your specific week of pregnancy or postpartum recovery.</p>
            </motion.div>

            {/* Small Feature 4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-4 bg-surface-container-highest/50 p-8 rounded-[2rem] border border-outline-variant/10"
            >
              <span className="material-symbols-outlined text-on-surface-variant mb-4">encrypted</span>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Private & Secure</h4>
              <p className="text-sm text-on-surface-variant">Your health data is encrypted and never sold. You are in complete control of your privacy.</p>
            </motion.div>

            {/* Small Feature 5 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-4 bg-surface-container-highest/50 p-8 rounded-[2rem] border border-outline-variant/10"
            >
              <span className="material-symbols-outlined text-on-surface-variant mb-4">forum</span>
              <h4 className="text-lg font-headline font-bold text-on-surface mb-2">Safe Community</h4>
              <p className="text-sm text-on-surface-variant">Moderated spaces to share experiences with other moms in similar stages of the journey.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-background overflow-hidden border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-headline font-bold text-on-surface mb-8">Real stories from the sanctuary.</h2>
              <div className="relative">
                <span className="text-9xl font-headline font-black text-primary/5 absolute -top-16 -left-8">"</span>
                <p className="text-2xl font-headline italic text-on-surface leading-relaxed relative z-10">
                  mumsy.ai didn't just track my pregnancy; it gave me peace of mind. When I felt unusual fatigue, the AI flagged a potential iron deficiency and my CHW helped me get tested within 24 hours.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnuRKNAkDfSUsgflpzQB1SyUHoU0Der4Vy8t-J9hZGhJRlY011I946BXss4_tdZAkW51LfQqos2OA6_svI4vU0hqHTiziS8iNp5Y_xr_ohekQR1PY_lDY-iF9E6oqQgPlS6xML8WySp9YFbdDkwS3DF5r9uYyfDP5hyXxw7RZvAGuiDMBYMHf0t_MqyBVUIQo_G_TPIKSO4W5w-sxBIkHSKP7ftNk5klkH3Btsz_BKhuzyZ7dsRc7QLFHQgRjPJO0Cpwey4p2OLG69"
                    alt="Aisha Aliko"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Aisha Aliko</h4>
                  <p className="text-sm text-on-surface-variant">Mother of two, Lagos</p>
                </div>
              </div>
            </motion.div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div whileHover={{ y: -5 }} className="bg-surface-container-low p-6 rounded-2xl">
                  <div className="flex text-primary mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm font-medium">"Finally, an app that feels like it was built by someone who actually cares."</p>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-surface-container-high p-6 rounded-2xl translate-x-4">
                  <div className="flex text-primary mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm font-medium">"The connection to a real person (CHW) makes all the difference."</p>
                </motion.div>
              </div>
              <div className="space-y-4 pt-12">
                <motion.div whileHover={{ y: -5 }} className="bg-primary-fixed p-6 rounded-2xl -translate-x-4">
                  <div className="flex text-primary mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-sm font-medium">"The AI predictions are spot on and presented so gently."</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-foreground rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
        >
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-headline font-bold text-white mb-6">Ready to find your sanctuary?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">Join thousands of mothers who are prioritizing their health with mumsy.ai. Start your journey today with 14 days on us.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onStart} className="bg-primary text-white px-10 py-4 rounded-xl font-headline font-bold hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20">
                Get Started Now
              </button>
              <button className="bg-white/10 backdrop-blur text-white px-10 py-4 rounded-xl font-headline font-bold hover:bg-white/20 transition-all active:scale-95">
                Compare Plans
              </button>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-container/20 rounded-full blur-[100px]"></div>
        </motion.div>
      </section>
    </div>
  );
}
