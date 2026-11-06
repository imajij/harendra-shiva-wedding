// All invitation text, transcribed from the printed card (3 photos, 2026-11-06).
// Edit here only; components read everything from this file.

export const couple = {
  groom: 'हरेन्द्र',
  bride: 'शिवा',
  joiner: 'संग',
  monogram: ['H', 'S'],
}

export const cover = {
  title: 'मंगल परिणय',
  ceremony: ['टीका पाणिग्रहण संस्कार', 'एवं प्रीतिभोज'],
  dateLine: 'बुधवार दिनांक 25 नवम्बर 2026',
  addressedTo: 'प्रतिष्ठा में,',
  honorific: 'श्रीमान्',
}

export const invocation = {
  salutation: '॥ श्री गणेशाय नमः ॥',
  doha: ['विघ्न हरण मंगल करण, गौरी पुत्र गणेश।', 'प्रथम निमंत्रण आपको, ब्रम्हा, विष्णु, महेश ॥'],
}

export const invitation = {
  greeting: 'स्नेही स्वजन',
  opening: 'परमपिता परमात्मा की असीम अनुकम्पा से हमारे यहाँ',
  groom: {
    title: 'आयुष्मान',
    name: 'हरेन्द्र',
    lines: [
      ['सुपौत्र', 'स्व. श्रीमती बैजन्ती – स्व. श्री श्रीराम शर्मा'],
      ['सुपुत्र', 'श्रीमती शीला – श्री उमेश शर्मा'],
      ['निवासी', 'गिंगरखी, तह. मेहगांव, जिला भिण्ड (म.प्र.)'],
      ['हाल निवासी', 'E1/74, हनुमान नगर, गोले का मंदिर ग्वालियर'],
    ],
  },
  joiner: 'संग',
  bride: {
    title: 'आयुष्मति',
    name: 'शिवा',
    lines: [
      ['सुपौत्री', 'स्व. श्रीमती ब्रम्हा देवी – श्री गोविन्द शरण उदैनियां'],
      ['सुपुत्री', 'श्रीमती मंजेश – श्री कृष्णकांत उदैनियां'],
      ['निवास', 'दतिया'],
    ],
  },
  festival: '॥ के मंगल परिणयोत्सव ॥',
  closing:
    'की अमृत बेला पर पधारकर नव–युगल को अपने भाव पुष्पों से स्नेह एवं आशीर्वाद प्रदान करने हेतु आपको सादर आमंत्रित करते हैं ।',
}

// ISO times are IST (+05:30). Events without a printed time have time: null.
export const programme = {
  heading: 'मांगलिक कार्यक्रम',
  events: [
    {
      id: 'mandap',
      name: 'मण्डप',
      day: 'मंगलवार',
      date: '24 नवम्बर 2026',
      time: null,
      image: 'event-mandap',
      en: 'Mandap',
    },
    {
      id: 'lagun',
      name: 'लगुन फलदान',
      day: 'बुधवार',
      date: '25 नवम्बर 2026',
      time: '(प्रातः 10 बजे)',
      image: 'event-lagun',
      en: 'Lagun Phaldan',
    },
    {
      id: 'teeka',
      name: 'टीका पाणिग्रहण संस्कार एवं प्रीतिभोज',
      day: 'बुधवार',
      date: '25 नवम्बर 2026',
      time: 'सायं 6 बजे से आपके आगमन तक',
      image: 'event-teeka',
      en: 'Teeka, Panigrahan & Reception',
      highlight: true,
    },
    {
      id: 'vadhu',
      name: 'वधु आगमन',
      day: 'गुरुवार',
      date: '26 नवम्बर 2026',
      time: null,
      image: 'event-vadhu',
      en: 'Vadhu Aagman',
    },
  ],
  note: 'नोट : बारात बुधवार दिनांक 25 नवम्बर 2026 को रात्रि 8 बजे हमारे निज निवास से Grand Castle Resort के लिए प्रस्थान करेगी ।',
}

export const venue = {
  label: 'प्रीतिभोज स्थल',
  name: 'Grand Castle Resort',
  address: 'मेला ग्राउण्ड रोड, सनसिटी ग्वालियर',
  // Link taken from the family's reference site (same venue).
  mapsUrl: 'https://maps.app.goo.gl/c1eRhKJdq1UsUqdn7',
  embedQuery: 'Grand Castle Resort, Mela Ground Road, Gwalior',
}

export const sender = {
  label: 'प्रेषक',
  name: 'श्री उमेश शर्मा',
  alias: '(बब्लू शर्मा)',
  address: ['निवास : E1/74, हनुमान नगर', 'गोले का मंदिर, ग्वालियर (म.प्र.)'],
  // The second number is cut off at the edge of the card photo ("62633887…").
  // Add it here once the family confirms the full number.
  phones: ['9200182972'],
}

// Countdown target: Teeka / Panigrahan / Pritibhoj, 25 Nov 2026, 6 pm IST.
export const countdownTarget = '2026-11-25T18:00:00+05:30'
