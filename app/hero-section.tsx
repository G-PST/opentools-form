export const HeroSection: React.FC = () => {
    return (
        <div className="text-center">
            <h1 className="text-3xl text-indigo-700">
                Welcome to G-PST OpenSource Tool Entry Generator</h1>
            <p className="py-5 text-gray-700"> Please use this form to fill out the details of your
                open source software record/s. At the end, you will be
                able to download JSON file containing the details of your entry.
                Please email this JSON file to <span>gpst@gmail.com</span>. Our
                team will reach out to you once the record is approved and
                updated on the GPST website.
            </p>
            <p className="text-indigo-700"> Thanks for taking the time to submit your software tool for consideration.</p>
        </div>
    )
}