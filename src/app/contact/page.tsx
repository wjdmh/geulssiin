import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
    title: '수업 신청·상담 문의',
    description:
        '글씨인아트센터 수업 신청 및 상담 문의. 붓 캘리그라피, 붓펜 캘리그라피, 펜드로잉, 서예, 원데이클래스. 김포 구래동.',
    alternates: { canonical: '/contact' },
}

export default function ContactPage() {
    return <ContactForm />
}
