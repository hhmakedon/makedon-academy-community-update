export type NewsletterSection = {
  eyebrow: string
  title: string
  paragraphs: readonly string[]
  items?: readonly string[]
}

export type NewsletterDate = {
  date: string
  label: string
}

export type NewsletterIssue = {
  slug: string
  updateId: string
  date: string
  dateLabel: string
  title: string
  intro: string
  highlights: readonly string[]
  sections: readonly NewsletterSection[]
  importantDates: readonly NewsletterDate[]
}

export const newsletterIssues = [
  {
    slug: '2026-07-31',
    updateId: 'weekly-update-2026-07-31',
    date: '2026-07-31',
    dateLabel: '7.31.26',
    title: 'Welcome to the 2026–2027 School Year',
    intro: 'I hope this first weekly update finds your family enjoying a wonderful summer. As we move closer to opening day, our staff is preparing the building, classrooms, and supports that will help every student begin the year feeling confident and connected.',
    highlights: ['Supply Pick-Up · August 17', 'Family Social · August 18', 'First Day · August 20'],
    sections: [
      {
        eyebrow: 'Getting ready',
        title: 'Supply Pick-Up Day',
        paragraphs: ['Monday, August 17 is Supply Pick-Up Day. Students can collect schedules, purchase PE uniforms and locks, submit school and health forms, set up lockers, tour the building, and learn about extracurricular opportunities.'],
        items: [
          '5th-grade math students: 8:00 a.m.–12:00 p.m.',
          '6th grade, last names A–K: 8:00–10:00 a.m.',
          '6th grade, last names L–Z: 10:00 a.m.–12:00 p.m.',
          '7th and 8th grade: 1:00–3:00 p.m.',
        ],
      },
      {
        eyebrow: 'A warm welcome',
        title: 'Family Social and Amazing Race',
        paragraphs: ['Our Family Social will be held August 18 from 4:00–6:00 p.m. Incoming sixth graders are also invited to the Amazing Race, a joyful evening of meeting classmates, learning the building, and taking part in team challenges before the first bell rings.'],
      },
      {
        eyebrow: 'Family checklist',
        title: 'Registration and health records',
        paragraphs: ['Students must have registration completed before receiving a schedule. Sixth-grade physicals and current immunizations are due by October 14, and the required dental examination is due by May 15, 2027. Families should send medication authorization forms and updated care plans to the health office before medication is needed at school.'],
      },
      {
        eyebrow: 'Everyday expectations',
        title: 'Helping students arrive ready to learn',
        paragraphs: ['Cell phones and smartwatches should remain off and out of sight from arrival through 2:35 p.m. Headphones should not be worn during the school day unless a teacher gives permission. Students may bring water bottles; other beverages should remain at home.'],
      },
    ],
    importantDates: [
      { date: 'August 17', label: 'Supply Pick-Up Day' },
      { date: 'August 18', label: 'Family Social and 6th-Grade Amazing Race' },
      { date: 'August 20', label: 'First day of school' },
      { date: 'August 25', label: 'Curriculum Night, 6:30–8:00 p.m.' },
      { date: 'August 28', label: 'Picture Day' },
      { date: 'September 7', label: 'No school' },
    ],
  },
  {
    slug: '2026-08-07',
    updateId: 'weekly-update-2026-08-07',
    date: '2026-08-07',
    dateLabel: '8.7.26',
    title: 'Gearing Up for a Strong Start',
    intro: 'We are less than two weeks from the first day of school, and the energy in the building is growing. Our staff is planning around school-improvement goals, welcoming new colleagues, and preparing the curriculum and supports our students will need.',
    highlights: ['Doors open · 7:43 a.m.', 'First period · 7:50 a.m.', 'Dismissal · 2:35 p.m.'],
    sections: [
      {
        eyebrow: 'Opening day',
        title: 'What families should know',
        paragraphs: ['The first day of attendance for all students is August 20. Students should bring the schedule they receive at Supply Pick-Up Day. Schedule changes are made only when the school has made a placement error, including lunch assignments.'],
      },
      {
        eyebrow: 'Stronger together',
        title: 'Family volunteers',
        paragraphs: ['Makedon Academy is strongest when families and staff work together. We are building a family volunteer list for lunch and recreation, school events, screenings, and other opportunities throughout the year. Sharing your interest simply lets us contact you when a need arises; it is not a commitment to every event.'],
      },
      {
        eyebrow: 'Student life',
        title: 'Fall athletics are beginning',
        paragraphs: ['Girls volleyball and cross country are preparing for their fall seasons. Students must have a current physical on file before participating. Cross-country students will meet after school August 25 and can take the late bus home.'],
      },
      {
        eyebrow: 'Before school begins',
        title: 'Complete the family checklist',
        paragraphs: ['Please finish registration, review fee and lunch-support options, submit health paperwork, and make sure your child knows the personal-device expectations. PE uniforms and locks can be purchased during Supply Pick-Up Day or through the school payment system.'],
      },
    ],
    importantDates: [
      { date: 'August 17', label: 'Supply Pick-Up Day' },
      { date: 'August 18', label: 'Family Social and Amazing Race' },
      { date: 'August 20', label: 'First day of school' },
      { date: 'August 25', label: 'Curriculum Night and cross-country meeting' },
      { date: 'August 28', label: 'Picture Day' },
      { date: 'September 24', label: 'Picture retakes' },
    ],
  },
  {
    slug: '2027-08-14',
    updateId: 'weekly-update-2027-08-14',
    date: '2027-08-14',
    dateLabel: '8.14.27',
    title: 'The 2026–2027 School Year Is Here',
    intro: 'The classrooms are nearly ready and we cannot wait to welcome students back. The first day will be a full day on August 20, with staff spending August 18 and 19 planning together so we can begin with purpose.',
    highlights: ['School hours · 7:50 a.m.–2:35 p.m.', 'Supply Pick-Up · August 17', 'Curriculum Night · August 25'],
    sections: [
      {
        eyebrow: 'Final preparations',
        title: 'Supply Pick-Up and new-student welcome',
        paragraphs: ['Supply Pick-Up Day is August 17. Families can collect schedules and IDs, submit forms, purchase locks and PE uniforms, set up lockers, and tour the school. We were also delighted to welcome students and families who are new to our community during orientation.'],
      },
      {
        eyebrow: 'Sixth-grade tradition',
        title: 'The Amazing Race',
        paragraphs: ['Incoming sixth graders should arrive at 5:45 p.m. on August 18, immediately after the Family Social. The event runs from 6:00–8:00 p.m. Students will meet classmates, practice navigating the school, and take part in team challenges.'],
      },
      {
        eyebrow: 'Family essentials',
        title: 'Lunch, visitors, transportation, and devices',
        paragraphs: ['Families can review menus and manage lunch balances through the school payment portal. All building visitors should bring photo identification and allow extra time for check-in. Families using district transportation can follow their bus through the FirstView app. Personal devices must remain out of sight throughout the instructional day unless an approved waiver is on file.'],
      },
      {
        eyebrow: 'Student opportunities',
        title: 'Fall teams are forming',
        paragraphs: ['Girls volleyball and cross country begin soon. Students need an eligible physical and completed participation form before practice. We encourage students to try something new, meet teammates, and represent Makedon Academy with pride.'],
      },
    ],
    importantDates: [
      { date: 'August 17', label: 'Supply Pick-Up Day' },
      { date: 'August 18', label: 'Family Social, 4:00–6:00 p.m.; Amazing Race, 6:00–8:00 p.m.' },
      { date: 'August 20', label: 'First day of school' },
      { date: 'August 25', label: 'Curriculum Night, 6:30–8:00 p.m.' },
      { date: 'August 28', label: 'Picture Day' },
      { date: 'September 7', label: 'No school for Labor Day' },
    ],
  },
  {
    slug: '2026-08-21',
    updateId: 'weekly-update-2026-08-21',
    date: '2026-08-21',
    dateLabel: '8.21.26',
    title: 'A Wonderful Start',
    intro: 'What an energizing opening week. Between Supply Pick-Up Day, our family social, the Amazing Race, and our first two days together, students have already begun building the relationships and routines that make a school feel like a community.',
    highlights: ['Curriculum Night · August 25', 'Picture Day · August 28', 'MAP Testing · September 1–2'],
    sections: [
      {
        eyebrow: 'Meet the team',
        title: 'Curriculum Night',
        paragraphs: ['Families will follow their student’s schedule on August 25 from 6:30–8:00 p.m. Please bring a printed or digital copy of the schedule. Band, orchestra, and eighth-grade family presentations begin earlier in the evening.'],
      },
      {
        eyebrow: 'Belonging in action',
        title: 'Advisory and Character Strong',
        paragraphs: ['Weekly advisory gives students dedicated time to build community, prepare for the future, and practice habits connected to belonging, engagement, and wellbeing. Our shared commitment is simple: take care of yourself, take care of each other, and take care of Makedon Academy.'],
      },
      {
        eyebrow: 'Find your place',
        title: 'Clubs, chorus, drama, and cross country',
        paragraphs: ['Students interested in chorus, drama club, the musical, or cross country have information meetings and first practices during the next two weeks. These activities are wonderful places to make friends, build confidence, and contribute to school life.'],
      },
      {
        eyebrow: 'Looking ahead',
        title: 'Eighth-grade family information',
        paragraphs: ['Eighth-grade families are invited to an early high-school transition presentation before Curriculum Night. Students will take the PreACT 8/9 during the school day on October 6 to support future course selection and placement.'],
      },
    ],
    importantDates: [
      { date: 'August 25', label: 'Curriculum Night, 6:30–8:00 p.m.' },
      { date: 'August 26', label: 'Chorus and drama information meeting' },
      { date: 'August 28', label: 'Picture Day' },
      { date: 'September 1–2', label: 'MAP testing' },
      { date: 'September 2', label: 'Family organization meeting, 7:00 p.m.' },
      { date: 'September 24', label: 'Picture retakes' },
    ],
  },
  {
    slug: '2026-08-28',
    updateId: 'weekly-update-2026-08-28',
    date: '2026-08-28',
    dateLabel: '8.28.26',
    title: 'Our First Full Week',
    intro: 'We made it through our first full week, and it was a joy to see students settling into routines, meeting challenges, and smiling for Picture Day. Thank you to every family who joined us for Curriculum Night and helped start the year in partnership.',
    highlights: ['MAP Testing · September 1–2', 'Safety Drill · September 3', 'Student Leadership applications · September 4'],
    sections: [
      {
        eyebrow: 'Learning check-in',
        title: 'MAP testing next week',
        paragraphs: ['Students will take reading and math MAP assessments from 7:50–10:05 a.m. on September 1 and 2. MAP does not affect grades; it gives teachers one more measure of progress. A good night’s sleep, breakfast, and an on-time arrival are the best preparation.'],
      },
      {
        eyebrow: 'Safe schools',
        title: 'Lockdown drill on September 3',
        paragraphs: ['Students will participate in our regular lockdown drill with local police. Teachers will secure classroom doors and turn off lights while students practice age-appropriate safety strategies. There are no loud noises or simulated threats, and the drill should take less than ten minutes.'],
      },
      {
        eyebrow: 'Student voice',
        title: 'Advisory, intramurals, and leadership',
        paragraphs: ['Our first advisory lesson challenged each class to build a school mascot from materials in the room. Intramural soccer is underway, Lego Robotics begins August 31, and the Student Leadership Coalition is accepting applications from students who want a voice in school culture and student experience.'],
      },
      {
        eyebrow: 'Learning in action',
        title: 'Collaboration across classrooms',
        paragraphs: ['Eighth-grade mathematicians are rotating group roles so everyone has a chance to lead. Family and consumer science students are practicing everyday life skills, and social studies students are defending strategic choices in a team survival challenge.'],
      },
    ],
    importantDates: [
      { date: 'September 1–2', label: 'MAP testing, 7:50–10:05 a.m.' },
      { date: 'September 2', label: 'Family organization meeting, 7:00 p.m.' },
      { date: 'September 3', label: 'School safety drill' },
      { date: 'September 4', label: 'Student Leadership applications due' },
      { date: 'September 11', label: 'Raider Pride Night, 7:00 p.m.' },
      { date: 'September 24', label: 'Picture retakes' },
    ],
  },
  {
    slug: '2026-09-04',
    updateId: 'weekly-update-2026-09-04',
    date: '2026-09-04',
    dateLabel: '9.4.26',
    title: 'Connection, Character, and School Spirit',
    intro: 'Even during a week of hot weather, our students stayed busy, creative, and connected inside the building. From hands-on projects to morning mascot visits, there was plenty of school spirit in our halls.',
    highlights: ['No school · September 7', 'Raider Pride Night · September 11', 'Picture Retakes · September 24'],
    sections: [
      {
        eyebrow: 'Character Strong',
        title: 'Our first community character challenge',
        paragraphs: ['Students are putting advisory learning into action by asking a family member about a favorite childhood tradition or activity, then asking at least two follow-up questions. The goal is to practice curiosity, active listening, and connection with the people who matter most.'],
      },
      {
        eyebrow: 'Student activities',
        title: 'Many ways to participate',
        paragraphs: ['Chorus rehearsals have begun, sixth-grade flag football and basketball start next week, and Math Team meets every Tuesday after school. Students are encouraged to try an activity that matches an interest—or discover a new one.'],
      },
      {
        eyebrow: 'Family reminder',
        title: 'Dropping off forgotten items',
        paragraphs: ['Please bring forgotten lunches, Chromebooks, instruments, or sports gear to the labeled drop-off area in the entryway. Students may check the area between classes or on the way to lunch. To protect learning time, office staff will not interrupt classes to announce deliveries.'],
      },
      {
        eyebrow: 'Community event',
        title: 'Raider Pride Night',
        paragraphs: ['Students are invited to attend the September 11 football game at 7:00 p.m. and wear school colors or spiritwear. Students who want to join the pregame cheer group should meet at the north end zone at 6:30 p.m.'],
      },
    ],
    importantDates: [
      { date: 'September 7', label: 'No school for Labor Day' },
      { date: 'September 8', label: 'Flag football and Math Team begin' },
      { date: 'September 9', label: 'Understanding Adolescence family webinar' },
      { date: 'September 11', label: 'Raider Pride Night' },
      { date: 'September 24', label: 'Picture retakes' },
      { date: 'September 25', label: 'No school—teacher collaboration day' },
    ],
  },
  {
    slug: '2026-09-11',
    updateId: 'weekly-update-2026-09-11',
    date: '2026-09-11',
    dateLabel: '9.11.26',
    title: 'Activities Are in Full Swing',
    intro: 'Sports and clubs are officially underway. Cross country and volleyball welcomed home crowds this week, Chess Club held its first meeting, and students continue to find places where their interests and talents can grow.',
    highlights: ['Parent Advisory begins · October 7', 'BESS screening · Next week', 'Picture Retakes · September 24'],
    sections: [
      {
        eyebrow: 'Family partnership',
        title: 'Join the Parent Advisory Group',
        paragraphs: ['The Parent Advisory Group will connect families and school leadership around student belonging, school initiatives, and community engagement. Meetings are monthly from 6:00–6:45 p.m., beginning October 7. Your experience and perspective are important to our school’s success.'],
        items: ['October 7', 'November 4', 'December 2', 'January 6', 'February 3', 'March 3', 'April 7', 'May 5'],
      },
      {
        eyebrow: 'Advisory',
        title: 'Celebrating community-building',
        paragraphs: ['Students selected their favorite advisory mascots this week, and classes celebrated the top three designs. Families can continue the learning at home through the Community Character Dare: ask about a family tradition, listen closely, and follow up with curiosity.'],
      },
      {
        eyebrow: 'Student wellbeing',
        title: 'Behavioral and emotional screening',
        paragraphs: ['Students will participate in the Behavioral and Emotional Screening System, or BESS. It is not diagnostic and does not affect grades. The results, paired with classroom observations, help staff understand self-regulation, relationships, and student wellbeing. Families will be contacted if an immediate concern appears.'],
      },
      {
        eyebrow: 'Community notice',
        title: 'What students may see after school',
        paragraphs: ['Representatives from Gideons International are expected on public property outside the school after dismissal September 14. Students may accept or decline literature. We are sharing this in advance so families can help students know what to expect.'],
      },
    ],
    importantDates: [
      { date: 'September 14', label: 'Community organization outside school after dismissal' },
      { date: 'September 15', label: 'Family webinar on environments that help young people thrive' },
      { date: 'September 24', label: 'Picture retakes and Library Teen Advisory Board' },
      { date: 'September 25', label: 'No school—teacher collaboration day' },
      { date: 'October 1', label: 'Vision and hearing screenings' },
      { date: 'October 6', label: 'Eighth-grade PreACT 8/9' },
    ],
  },
  {
    slug: '2026-09-18',
    updateId: 'weekly-update-2026-09-18',
    date: '2026-09-18',
    dateLabel: '9.18.26',
    title: 'Learning in Action',
    intro: 'This week was filled with hands-on learning. Students mapped absolute locations, tested sound waves through a telephone lab, and practiced teamwork and sportsmanship in our schoolwide World Cup activities.',
    highlights: ['Picture Retakes · September 24', 'No School · September 25', 'Screenings · October 1'],
    sections: [
      {
        eyebrow: 'Inside our classrooms',
        title: 'Curiosity, collaboration, and movement',
        paragraphs: ['Social studies students worked in teams to identify absolute locations around the world. Eighth-grade scientists tested how sound travels, while physical education classes represented World Cup nations and practiced positive competition across grade levels.'],
      },
      {
        eyebrow: 'Character Strong',
        title: 'Take the learning home through music',
        paragraphs: ['The Character Strong family playlist gives students and families another way to practice the traits discussed in advisory. Listen at home, in the car, or during daily routines, then talk about how the songs connect to belonging, purpose, and care for others.'],
      },
      {
        eyebrow: 'Health and access',
        title: 'Vision and hearing screenings',
        paragraphs: ['Screenings take place October 1, with re-screenings October 15. All eighth graders receive a vision screening. New students and students receiving special education services receive both vision and hearing screenings.'],
      },
      {
        eyebrow: 'After-school opportunities',
        title: 'Library leadership and intramurals',
        paragraphs: ['The Library Teen Advisory Board meets September 24 after school. Sixth-grade intramural basketball and flag football continue through October 7, and students may attend as many scheduled dates as they wish.'],
      },
      {
        eyebrow: 'Family voice',
        title: 'Advisory opportunities for families',
        paragraphs: ['The Parent Advisory Group begins October 7 and will meet monthly for 45 minutes. Families connected to bilingual and English-learner programs are also invited to join the district advisory committee and help strengthen access and communication.'],
      },
    ],
    importantDates: [
      { date: 'September 21', label: 'Board of Education meeting' },
      { date: 'September 24', label: 'Picture retakes and Library Teen Advisory Board' },
      { date: 'September 25', label: 'No school—teacher collaboration day' },
      { date: 'October 1', label: 'Vision and hearing screenings' },
      { date: 'October 6', label: 'Eighth-grade PreACT 8/9' },
      { date: 'October 15', label: 'Vision and hearing re-screenings' },
    ],
  },
  {
    slug: '2026-09-25',
    updateId: 'weekly-update-2026-09-25',
    date: '2026-09-25',
    dateLabel: '9.25.26',
    title: 'School Spirit and Fall Connections',
    intro: 'The cooler weather is arriving, and so is an exciting stretch of the school year. Next week we will gather for our first schoolwide pep assembly, cheer on students at the Lip Sync Battle, and continue creating the traditions that make Makedon Academy feel like home.',
    highlights: ['Screenings · October 1', 'Pep Assembly & Lip Sync · October 2', 'PreACT · October 6'],
    sections: [
      {
        eyebrow: 'Academy pride',
        title: 'Our first schoolwide pep assembly',
        paragraphs: ['On October 2, students and staff will come together for games, music, and plenty of school spirit. Students are invited to wear their grade-level color: blue for eighth grade, white for seventh grade, and black for sixth grade. Our Lip Sync Battle follows that evening and promises to be a fun celebration of student creativity.'],
      },
      {
        eyebrow: 'Future Ready',
        title: 'Building skills through advisory',
        paragraphs: ['Advisory lessons continue to help students practice the skills they will use in school and beyond. Sixth- and eighth-grade students are focusing on teamwork and collaboration, while seventh graders are exploring the habits and skills that support future careers.'],
      },
      {
        eyebrow: 'Get involved',
        title: 'Clubs and fall activities',
        paragraphs: ['Dungeons & Dragons Club holds its first meeting October 1. Sixth-grade intramural basketball and flag football continue through October 7, and the sixth-grade Halloween Social is October 16. These opportunities give students another place to connect, try something new, and find their people.'],
      },
      {
        eyebrow: 'Family partnership',
        title: 'Your voice belongs here',
        paragraphs: ['Our Parent Advisory Group begins October 7 and meets monthly from 6:00–6:45 p.m. Families are also invited to the Culture and Resource Fair on October 27. Fall conferences will be held October 22 and 23, with sign-up information coming soon.'],
        items: ['October 7', 'November 4', 'December 2', 'January 6', 'February 3', 'March 3', 'April 7', 'May 5'],
      },
    ],
    importantDates: [
      { date: 'October 1', label: 'Vision and hearing screenings and first Dungeons & Dragons meeting' },
      { date: 'October 2', label: 'Academy Pride Pep Assembly and Lip Sync Battle' },
      { date: 'October 6', label: 'Eighth-grade PreACT 8/9' },
      { date: 'October 7', label: 'Parent Advisory Group and final day of fall intramurals' },
      { date: 'October 12', label: 'No school' },
      { date: 'October 16', label: 'Sixth-grade Halloween Social' },
      { date: 'October 22–23', label: 'Fall conferences' },
      { date: 'October 27', label: 'Culture and Resource Fair' },
    ],
  },
  {
    slug: '2026-10-02',
    updateId: 'weekly-update-2026-10-02',
    date: '2026-10-02',
    dateLabel: '10.2.26',
    title: 'A Week Full of School Spirit',
    intro: 'Today we held our first schoolwide pep assembly, and the energy in the gym was outstanding. Students, staff, firefighters, and police officers joined in friendly competition, and we will keep the celebration going tonight at the Lip Sync Battle. Moments like these help students feel connected to one another and proud of their school.',
    highlights: ['PreACT · October 6', 'Conference Signup · October 5–20', 'Halloween Social · October 16'],
    sections: [
      {
        eyebrow: 'Family conferences',
        title: 'Reserve a time to connect',
        paragraphs: ['Online sign-up for fall conferences opens October 5 at 9:00 a.m. and closes October 20 at noon. Conferences take place the evening of October 22 and during the day October 23. This is an important chance to celebrate progress, ask questions, and plan the next steps together.'],
      },
      {
        eyebrow: 'Advisory',
        title: 'Practicing our Academy focus',
        paragraphs: ['This week students used a schoolwide bingo activity to review the habits and values that help our community thrive. The conversations gave students a playful way to make connections across classrooms while reinforcing what it means to show care, responsibility, and belonging.'],
      },
      {
        eyebrow: 'Athletics and activities',
        title: 'New opportunities are beginning',
        paragraphs: ['Boys basketball tryouts are October 14 and 15, with physicals and participation forms due October 9. Cheer clinics are October 19 and 20, followed by tryouts October 21. Artists & Authors Club begins October 14, and Math Team members will complete their qualifying round October 6.'],
      },
      {
        eyebrow: 'Community connection',
        title: 'Celebrate the cultures of our families',
        paragraphs: ['Our Culture and Resource Fair is October 27 from 6:00–7:30 p.m. Families are invited to share food, traditions, music, art, and stories, or simply come learn and celebrate with neighbors. Every family adds something important to the Makedon Academy community.'],
      },
    ],
    importantDates: [
      { date: 'October 5', label: 'Fall conference sign-up opens at 9:00 a.m.' },
      { date: 'October 6', label: 'Eighth-grade PreACT 8/9 and Math Team qualifying round' },
      { date: 'October 9', label: 'Basketball physicals and participation forms due' },
      { date: 'October 12', label: 'No school' },
      { date: 'October 14–15', label: 'Boys basketball tryouts' },
      { date: 'October 16', label: 'Sixth-grade Halloween Social' },
      { date: 'October 19–21', label: 'Cheer clinics and tryout' },
      { date: 'October 22–23', label: 'Fall conferences' },
      { date: 'October 27', label: 'Culture and Resource Fair' },
    ],
  },
  {
    slug: '2026-10-09',
    updateId: 'weekly-update-2026-10-09',
    date: '2026-10-09',
    dateLabel: '10.9.26',
    title: 'Family Engagement in Action',
    intro: 'Thank you to the families who joined our first Parent Advisory meeting. Honest conversation and shared ideas make our school stronger. Our next meeting is November 4, and we are also preparing to welcome family and community volunteers through a new program called Heroes of the Hallway.',
    highlights: ['No School · October 12', 'Halloween Social · October 16', 'Conferences · October 22–23'],
    sections: [
      {
        eyebrow: 'Heroes of the Hallway',
        title: 'Trusted adults making a difference',
        paragraphs: ['Beginning November 6, approved family and community volunteers will spend time in our hallways and shared spaces, greeting students, encouraging positive choices, and helping every student feel seen. More information about volunteering and required screening will be shared with interested families.'],
      },
      {
        eyebrow: 'Advisory',
        title: 'Preventing bullying together',
        paragraphs: ['Students are learning age-appropriate strategies for recognizing and responding to bullying. Across grade levels, we are reinforcing three clear actions: stop, support, and report. Families can help by asking what these words mean and reminding students that seeking help is a sign of strength.'],
      },
      {
        eyebrow: 'Athletics and activities',
        title: 'A busy October ahead',
        paragraphs: ['Boys basketball tryouts are October 14 and 15. Cheer clinics take place October 19 and 20, with tryouts October 21. We are proud of every student who takes the risk of trying something new and grateful to the adults who create these opportunities.'],
      },
      {
        eyebrow: 'Family connection',
        title: 'Conferences and community events',
        paragraphs: ['Conference sign-up remains open through noon October 20. The sixth-grade Halloween Social is October 16, and our Culture and Resource Fair is October 27. We are also beginning preparations for a Veterans Day assembly that will honor members of our community who have served.'],
      },
    ],
    importantDates: [
      { date: 'October 12', label: 'No school' },
      { date: 'October 14–15', label: 'Boys basketball tryouts' },
      { date: 'October 16', label: 'Sixth-grade Halloween Social, 7:00–8:30 p.m.' },
      { date: 'October 19–21', label: 'Cheer clinics and tryout' },
      { date: 'October 22', label: 'Evening conferences' },
      { date: 'October 23', label: 'No school and daytime conferences' },
      { date: 'October 27', label: 'Culture and Resource Fair' },
      { date: 'October 30', label: 'Early dismissal at 11:15 a.m.' },
      { date: 'November 2–3', label: 'No school' },
      { date: 'November 6', label: 'Heroes of the Hallway begins' },
    ],
  },
  {
    slug: '2026-10-16',
    updateId: 'weekly-update-2026-10-16',
    date: '2026-10-16',
    dateLabel: '10.16.26',
    title: 'Fall Conferences and Community Connections',
    intro: 'Fall conferences are next week, and I hope every family will take advantage of this time to connect with teachers. Sign-up remains open through noon October 20. There is no school October 23, when daytime conferences will continue.',
    highlights: ['Conferences · October 22–23', 'Culture Fair · October 27', 'Heroes Begin · November 6'],
    sections: [
      {
        eyebrow: 'Family conferences',
        title: 'A conversation centered on your child',
        paragraphs: ['Conferences are a chance to celebrate growth, understand current challenges, and make sure school and home are working from the same picture. Bring your questions and the insights only you have about your child. Our strongest plans are the ones we build together.'],
      },
      {
        eyebrow: 'Heroes of the Hallway',
        title: 'More caring adults in our school',
        paragraphs: ['Our new volunteer program begins November 6. Approved family and community members will be a welcoming presence in hallways and shared spaces, helping students feel noticed, supported, and connected throughout the day.'],
      },
      {
        eyebrow: 'Learning in action',
        title: 'Students learning by doing',
        paragraphs: ['This week students planted and cared for greenery, practiced fall baking skills, and explored careers that connect to their strengths and interests. Cheer clinics begin October 19, followed by the October 21 tryout. These hands-on experiences build confidence, curiosity, and independence.'],
      },
      {
        eyebrow: 'Community connections',
        title: 'Important opportunities and reminders',
        paragraphs: ['The Culture and Resource Fair is October 27. The district will place a test emergency call October 23 at 2:00 p.m., and our annual Title I family meeting will be held that morning at 10:00 a.m. Music Boosters holiday décor orders are due November 17, with pickup December 5.'],
      },
    ],
    importantDates: [
      { date: 'October 19–21', label: 'Cheer clinics and tryout' },
      { date: 'October 20', label: 'Conference sign-up closes at noon' },
      { date: 'October 22', label: 'Evening conferences' },
      { date: 'October 23', label: 'No school, daytime conferences, Title I meeting, and emergency call test' },
      { date: 'October 27', label: 'Culture and Resource Fair' },
      { date: 'October 30', label: 'Early dismissal at 11:15 a.m.' },
      { date: 'November 2–3', label: 'No school' },
      { date: 'November 6', label: 'Heroes of the Hallway begins' },
      { date: 'November 17', label: 'Music Boosters holiday décor orders due' },
      { date: 'December 5', label: 'Music Boosters holiday décor pickup' },
    ],
  },
] as const satisfies readonly NewsletterIssue[]

export function getNewsletterIssue(slug: string | null) {
  return newsletterIssues.find((issue) => issue.slug === slug)
}
