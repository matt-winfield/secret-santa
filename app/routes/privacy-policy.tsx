import { cn } from '@/utils/misc';
import { PropsWithChildren } from 'react';

const Paragraph = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <p className={cn('my-2', className)}>{children}</p>
);

const List = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <ul className={cn('list-outside list-disc pl-10', className)}>
        {children}
    </ul>
);

const Heading = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => {
    return (
        <h1 className={cn(`my-6 text-3xl font-bold`, className)}>{children}</h1>
    );
};

const Heading2 = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <h2 className={cn('my-5 text-xl font-bold', className)}>{children}</h2>
);

const Heading3 = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <h3 className={cn('my-4 text-lg font-bold', className)}>{children}</h3>
);

const Heading4 = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => (
    <h4 className={cn('my-3 text-base font-bold', className)}>{children}</h4>
);

const Link = ({
    children,
    href,
    className,
}: PropsWithChildren<{ href: string; className?: string }>) => (
    <a
        href={href}
        className={cn('text-accent-foreground hover:underline', className)}
    >
        {children}
    </a>
);

export default function PrivacyPolicy() {
    return (
        <main className="text container">
            <Heading className="my-6 text-3xl font-bold">
                Privacy Policy
            </Heading>
            <Paragraph className="my-2 text-muted-foreground">
                Last updated: June 14, 2024
            </Paragraph>
            <Paragraph>
                This Privacy Policy describes the policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Services developed by Matthew Winfield and tells You about
                Your privacy rights and how the law protects You.
            </Paragraph>
            <Paragraph>
                We use Your Personal data to provide and improve the Services.
                By using the Services, You agree to the collection and use of
                information in accordance with this Privacy Policy.
            </Paragraph>
            <Heading2 className="my-5 text-2xl font-bold">
                Interpretation and Definitions
            </Heading2>
            <Heading3 className="my-3 text-xl font-bold">
                Interpretation
            </Heading3>
            <Paragraph>
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
            </Paragraph>
            <Heading3 className="my-3 text-xl font-bold">Definitions</Heading3>
            <Paragraph>For the purposes of this Privacy Policy:</Paragraph>
            <List>
                <li>
                    <Paragraph>
                        <strong>Account</strong> means a unique account created
                        for You to access our Services or parts of our Services.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Affiliate</strong> means an entity that
                        controls, is controlled by or is under common control
                        with a party, where &quot;control&quot; means ownership
                        of 50% or more of the shares, equity interest or other
                        securities entitled to vote for election of directors or
                        other managing authority.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Company</strong> (referred to as either
                        &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;
                        or &quot;Our&quot; in this Agreement) refers to Matthew
                        Winfield.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Cookies</strong> are small files that are placed
                        on Your computer, mobile device or any other device by a
                        website, containing the details of Your browsing history
                        on that website among its many uses.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Country</strong> refers to: United Kingdom
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Device</strong> means any device that can access
                        the Services such as a computer, a cellphone or a
                        digital tablet.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Personal Data</strong> is any information that
                        relates to an identified or identifiable individual.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Services</strong> refers to the Websites, and
                        any other websites, web pages, mobile applications and
                        social media applications owned or operated by Matthew
                        Winfield.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Service Provider</strong> means any natural or
                        legal person who processes the data on behalf of the
                        Company. It refers to third-party companies or
                        individuals employed by the Company to facilitate the
                        Services, to provide the Services on behalf of the
                        Company, to perform services related to the Services or
                        to assist the Company in analyzing how the Services are
                        used.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Usage Data</strong> refers to data collected
                        automatically, either generated by the use of the
                        Services or from the Services infrastructure itself (for
                        example, the duration of a page visit).
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Websites</strong> refers to the Matt Winfield
                        website, accessible from{' '}
                        <Link href="https://www.matt-winfield.com">
                            https://www.matt-winfield.com
                        </Link>
                        , and any other websites, web pages, mobile applications
                        and social media applications owned or operated by
                        Matthew Winfield.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>You</strong> means the individual accessing or
                        using the Services, or the company, or other legal
                        entity on behalf of which such individual is accessing
                        or using the Services, as applicable.
                    </Paragraph>
                </li>
            </List>
            <Heading2>Collecting and Using Your Personal Data</Heading2>
            <Heading3>Types of Data Collected</Heading3>
            <Heading4>Personal Data</Heading4>
            <Paragraph>
                While using Our Services, We may ask You to provide Us with
                certain personally identifiable information that can be used to
                contact or identify You. Personally identifiable information may
                include, but is not limited to:
            </Paragraph>
            <List>
                <li>Usage Data</li>
            </List>
            <Heading4>Usage Data</Heading4>
            <Paragraph>
                Usage Data is collected automatically when using the Services.
            </Paragraph>
            <Paragraph>
                Usage Data may include information such as Your Device's
                Internet Protocol address (e.g. IP address), browser type,
                browser version, the pages of our Services that You visit, the
                time and date of Your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data.
            </Paragraph>
            <Paragraph>
                When You access the Services by or through a mobile device, We
                may collect certain information automatically, including, but
                not limited to, the type of mobile device You use, Your mobile
                device unique ID, the IP address of Your mobile device, Your
                mobile operating system, the type of mobile Internet browser You
                use, unique device identifiers and other diagnostic data.
            </Paragraph>
            <Paragraph>
                We may also collect information that Your browser sends whenever
                You visit our Services or when You access the Services by or
                through a mobile device.
            </Paragraph>
            <Heading4>Tracking Technologies and Cookies</Heading4>
            <Paragraph>
                We use Cookies and similar tracking technologies to track the
                activity on Our Services and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Services. The
                technologies We use may include:
            </Paragraph>
            <List>
                <li>
                    <strong>Analytics scripts.</strong> We make use of analytics
                    on some of our services to help us understand how our
                    services are used. This data is anonymised and cannot be
                    used to identify you.
                </li>
                <li>
                    <strong>Cookies or Browser Cookies.</strong> A cookie is a
                    small file placed on Your Device. You can instruct Your
                    browser to refuse all Cookies or to indicate when a Cookie
                    is being sent. However, if You do not accept Cookies, You
                    may not be able to use some parts of our Services. Unless
                    you have adjusted Your browser setting so that it will
                    refuse Cookies, our Services may use Cookies.
                </li>
            </List>
            <Paragraph>
                Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                Cookies. Persistent Cookies remain on Your personal computer or
                mobile device when You go offline, while Session Cookies are
                deleted as soon as You close Your web browser.{' '}
            </Paragraph>
            <Paragraph>
                We use both Session and Persistent Cookies for the purposes set
                out below:
            </Paragraph>
            <List>
                <li>
                    <Paragraph>
                        <strong>Necessary / Essential Cookies</strong>
                    </Paragraph>
                    <Paragraph>Type: Session Cookies</Paragraph>
                    <Paragraph>Administered by: Us</Paragraph>
                    <Paragraph>
                        Purpose: These Cookies are essential to provide You with
                        services available through the Websites and to enable
                        You to use some of its features. They help to
                        authenticate users and prevent fraudulent use of user
                        accounts. Without these Cookies, the services that You
                        have asked for cannot be provided, and We only use these
                        Cookies to provide You with those services.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>
                            Cookies Policy / Notice Acceptance Cookies
                        </strong>
                    </Paragraph>
                    <Paragraph>Type: Persistent Cookies</Paragraph>
                    <Paragraph>Administered by: Us</Paragraph>
                    <Paragraph>
                        Purpose: These Cookies identify if users have accepted
                        the use of cookies on the Websites.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>Functionality Cookies</strong>
                    </Paragraph>
                    <Paragraph>Type: Persistent Cookies</Paragraph>
                    <Paragraph>Administered by: Us</Paragraph>
                    <Paragraph>
                        Purpose: These Cookies allow us to remember choices You
                        make when You use the Websites, such as remembering your
                        login details or language preference. The purpose of
                        these Cookies is to provide You with a more personal
                        experience and to avoid You having to re-enter your
                        preferences every time You use the Websites.
                    </Paragraph>
                </li>
            </List>
            <Heading3>Use of Your Personal Data</Heading3>
            <Paragraph>
                The Company may use Personal Data for the following purposes:
            </Paragraph>
            <List>
                <li>
                    <Paragraph>
                        <strong>To provide and maintain our Services</strong>,
                        including to monitor the usage of our Services.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>To manage Your Account:</strong> to manage Your
                        registration as a user of the Services. The Personal
                        Data You provide can give You access to different
                        functionalities of the Services that are available to
                        You as a registered user.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>For the performance of a contract:</strong> the
                        development, compliance and undertaking of the purchase
                        contract for the products, items or services You have
                        purchased or of any other contract with Us through the
                        Services.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>To contact You:</strong> To contact You by
                        email, telephone calls, SMS, or other equivalent forms
                        of electronic communication, such as a mobile
                        application's push notifications regarding updates or
                        informative communications related to the
                        functionalities, products or contracted services,
                        including the security updates, when necessary or
                        reasonable for their implementation.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>To provide You</strong> with news, special
                        offers and general information about other goods,
                        services and events which we offer that are similar to
                        those that you have already purchased or enquired about
                        unless You have opted not to receive such information.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>To manage Your requests:</strong> To attend and
                        manage Your requests to Us.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>For business transfers:</strong> We may use Your
                        information to evaluate or conduct a merger,
                        divestiture, restructuring, reorganization, dissolution,
                        or other sale or transfer of some or all of Our assets,
                        whether as a going concern or as part of bankruptcy,
                        liquidation, or similar proceeding, in which Personal
                        Data held by Us about our Services users is among the
                        assets transferred.
                    </Paragraph>
                </li>
                <li>
                    <Paragraph>
                        <strong>For other purposes</strong>: We may use Your
                        information for other purposes, such as data analysis,
                        identifying usage trends, determining the effectiveness
                        of our promotional campaigns and to evaluate and improve
                        our Services, products, services, marketing and your
                        experience.
                    </Paragraph>
                </li>
            </List>
            <Paragraph>
                We may share Your personal information in the following
                situations:
            </Paragraph>
            <List>
                <li>
                    <strong>With Service Providers:</strong> We may share Your
                    personal information with Services Providers to monitor and
                    analyze the use of our Services, to contact You.
                </li>
                <li>
                    <strong>For business transfers:</strong> We may share or
                    transfer Your personal information in connection with, or
                    during negotiations of, any merger, sale of Company assets,
                    financing, or acquisition of all or a portion of Our
                    business to another company.
                </li>
                <li>
                    <strong>With Affiliates:</strong> We may share Your
                    information with Our affiliates, in which case we will
                    require those affiliates to honor this Privacy Policy.
                    Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that
                    We control or that are under common control with Us.
                </li>
                <li>
                    <strong>With business partners:</strong> We may share Your
                    information with Our business partners to offer You certain
                    products, services or promotions.
                </li>
                <li>
                    <strong>With other users:</strong> when You share personal
                    information or otherwise interact in the public areas with
                    other users, such information may be viewed by all users and
                    may be publicly distributed outside.
                </li>
                <li>
                    <strong>With Your consent</strong>: We may disclose Your
                    personal information for any other purpose with Your
                    consent.
                </li>
            </List>
            <Heading3>Retention of Your Personal Data</Heading3>
            <Paragraph>
                The Company will retain Your Personal Data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use Your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
            </Paragraph>
            <Paragraph>
                The Company will also retain Usage Data for internal analysis
                purposes. Usage Data is generally retained for a shorter period
                of time, except when this data is used to strengthen the
                security or to improve the functionality of Our Services, or We
                are legally obligated to retain this data for longer time
                periods.
            </Paragraph>
            <Heading3>Transfer of Your Personal Data</Heading3>
            <Paragraph>
                Your information, including Personal Data, is processed at the
                Company's operating offices and in any other places where the
                parties involved in the processing are located. It means that
                this information may be transferred to — and maintained on —
                computers located outside of Your state, province, country or
                other governmental jurisdiction where the data protection laws
                may differ than those from Your jurisdiction.
            </Paragraph>
            <Paragraph>
                Your consent to this Privacy Policy followed by Your submission
                of such information represents Your agreement to that transfer.
            </Paragraph>
            <Paragraph>
                The Company will take all steps reasonably necessary to ensure
                that Your data is treated securely and in accordance with this
                Privacy Policy and no transfer of Your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of Your data and other
                personal information.
            </Paragraph>
            <Heading3>Delete Your Personal Data</Heading3>
            <Paragraph>
                You have the right to delete or request that We assist in
                deleting the Personal Data that We have collected about You.
            </Paragraph>
            <Paragraph>
                Our Services may give You the ability to delete certain
                information about You from within the Services.
            </Paragraph>
            <Paragraph>
                You may update, amend, or delete Your information at any time by
                signing in to Your Account, if you have one, and visiting the
                account settings section that allows you to manage Your personal
                information. You may also contact Us to request access to,
                correct, or delete any personal information that You have
                provided to Us.
            </Paragraph>
            <Paragraph>
                Please note, however, that We may need to retain certain
                information when we have a legal obligation or lawful basis to
                do so.
            </Paragraph>
            <Heading3>Disclosure of Your Personal Data</Heading3>
            <Heading4>Business Transactions</Heading4>
            <Paragraph>
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
            </Paragraph>
            <Heading4>Law enforcement</Heading4>
            <Paragraph>
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
            </Paragraph>
            <Heading4>Other legal requirements</Heading4>
            <Paragraph>
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
            </Paragraph>
            <List>
                <li>Comply with a legal obligation</li>
                <li>
                    Protect and defend the rights or property of the Company
                </li>
                <li>
                    Prevent or investigate possible wrongdoing in connection
                    with the Services
                </li>
                <li>
                    Protect the personal safety of Users of the Services or the
                    public
                </li>
                <li>Protect against legal liability</li>
            </List>
            <Heading3>Security of Your Personal Data</Heading3>
            <Paragraph>
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
            </Paragraph>
            <Heading2>Children's Privacy</Heading2>
            <Paragraph>
                Our Services does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If You are a parent or guardian and
                You are aware that Your child has provided Us with Personal
                Data, please contact Us. If We become aware that We have
                collected Personal Data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from Our servers.
            </Paragraph>
            <Paragraph>
                If We need to rely on consent as a legal basis for processing
                Your information and Your country requires consent from a
                parent, We may require Your parent's consent before We collect
                and use that information.
            </Paragraph>
            <Heading2>Links to Other Websites</Heading2>
            <Paragraph>
                Our Services may contain links to other websites that are not
                operated by Us. If You click on a third party link, You will be
                directed to that third party's site. We strongly advise You to
                review the Privacy Policy of every site You visit.
            </Paragraph>
            <Paragraph>
                We have no control over and assume no responsibility for the
                content, privacy policies or practices of any third party sites
                or services.
            </Paragraph>
            <Heading2>Changes to this Privacy Policy</Heading2>
            <Paragraph>
                We may update Our Privacy Policy from time to time. We will
                notify You of any changes by posting the new Privacy Policy on
                this page.
            </Paragraph>
            <Paragraph>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
            </Paragraph>
        </main>
    );
}
