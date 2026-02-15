This revised roadmap shifts the focus to your unique **"Cognitive Deciphering"** goal. The primary challenge for this 3.5-day sprint is ensuring the frontend's timing logic and the backend's data delivery are perfectly synced for that "Introductory Module."

### **Revised "LingoVision" Sprint Roadmap**

---

#### **Phase 1: The Immersive Foundation (Sunday: 10 am – 6 pm)**

*Goal: Build the "Decipher" engine (No translation yet).*

* **10:00 am \- 1:00 pm:**  
  * **Michael (FE):** Component scaffolding. Create the `ImmersiveCard` state machine: `HIDDEN` → `INPUT_ONLY` (Img+Aud) → `DECODED` (Target Text Reveal).  
  * **Manuel (BE):** API Infrastructure. Build the `Unit` model that can hold a specific flag for `isIntroductory`.  
* **2:00 pm \- 6:00 pm (After Break):**  
  * **Michael:** Implement the 2-second "Thinking Gap." Add a high-quality CSS fade-in for the target text to reward the user's decoding effort.  
  * **Manuel:** Asset Pipeline. Upload 10-15 high-res images and clear audio clips for "Unit 1" to a cloud host. Create the JSON response.  
  * **Sync Point:** Verify that the first unit loads *only* in the target language.

---

#### **Phase 2: The "Babbel Bridge" (Monday: 6:30 pm – 10 pm)**

*Goal: Transition from pure immersion to bilingual reinforcement.*

* **6:30 pm \- 8:30 pm:**  
  * **Michael:** Build the `DrillCard`. This version shows Target Text immediately but hides the **English Translation** behind a "Peek" button or a second timer.  
  * **Manuel:** Update the database to include an `english_hint` field for every card.  
* **8:30 pm \- 10:00 pm:**  
  * **Integration:** Logic check—ensure the app starts with `ImmersiveCard` for the first 5 words of a unit, then switches to `DrillCard` for reinforcement.

---

#### **Phase 3: Logic & Concept (Tuesday: 6:30 pm – 10 pm)**

*Goal: Add the "Linguistic Concept" screens.*

* **6:30 pm \- 8:30 pm:**  
  * **Michael:** Create the `ConceptCard` UI. This is for the "Unit Summary" where users see the grammar rule they just "decoded" (e.g., "You noticed 'La'—that's for feminine nouns\!").  
  * **Manuel:** Create the `Concept` data object. Add 2 more units (Unit 2 and Unit 3\) to the DB to ensure the "Next Unit" flow works.  
* **8:30 pm \- 10:00 pm:**  
  * **Michael:** Add the "Start Session" splash screen to handle the browser's "User must click to play audio" requirement.

---

#### **Phase 4: Deployment & Polish (Wednesday: 6:30 pm – 10 pm)**

*Goal: Launch and verify the "Decipher" feel.*

* **6:30 pm \- 8:30 pm:**  
  * **Both:** Deploy to Vercel (FE) and Render (BE).  
  * **Michael:** Mobile Responsiveness. Ensure the image is big enough on a phone for the user to "decode" the meaning.  
* **8:30 pm \- 10:00 pm:**  
  * **Final QA:** Test the 2-second delay. Is it too fast? Too slow? Tune the "Association" timing for maximum learning impact.

---

### **Sprint Architecture Diagram**

This shows how the frontend will "wait" for the brain to decode before showing the text.

### **Technical "Association" Tip for Michael**

When building the "Introductory" cards, use a **Canvas-based** or **Blurred** placeholder for the text area. This signals to the user that text *is* coming, which reduces the anxiety of not understanding the audio immediately.

