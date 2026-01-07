export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-serif font-bold text-white">글씨인아트센터</h3>
                    <p className="text-sm text-gray-500 mt-2">캘리그라피 & 펜 드로잉 스튜디오</p>
                </div>
                <div className="flex flex-col gap-1 text-right text-sm text-gray-600">
                    <span>&copy; {new Date().getFullYear()} Geulssiin. All rights reserved.</span>
                    <span className="text-gray-500">경기도 김포시 김포한강9로 75번길 158 A동 308호</span>
                </div>
            </div>
        </footer>
    );
}
