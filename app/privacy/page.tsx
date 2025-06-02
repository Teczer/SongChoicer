'use client';

import { motion } from 'framer-motion';

import FooterCopyrights from '@/components/FooterCopyrights';
import { AuroraBackground } from '@/components/ui/aurora-background';

export default function PrivacyPolicy() {
  return (
    <AuroraBackground className="pt-4 homepagecontainer_pwa">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative w-full min-h-screen flex flex-col gap-4 items-center justify-start py-16 px-4 sm:py-0 sm:justify-center sm:gap-6"
      >
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">Règles de Confidentialité</h1>
          <p className="mb-4">
            Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles données nous
            collectons, comment nous les utilisons et vos droits en tant qu&apos;utilisateur.
          </p>
          <h2 className="text-2xl font-bold mb-2">1. Informations que nous collectons</h2>
          <p className="mb-4">
            Nous collectons différents types d&apos;informations dans le cadre de la fourniture de nos services, y
            compris :
            <ul className="list-disc list-inside ml-4">
              <li>Données d&apos;utilisation : informations sur la manière dont vous utilisez notre application.</li>
              <li>Informations techniques : type d&apos;appareil, système d&apos;exploitation, etc.</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-2">2. Comment nous utilisons vos informations</h2>
          <p className="mb-4">
            Nous utilisons les informations que nous collectons pour :
            <ul className="list-disc list-inside ml-4">
              <li>Fournir, exploiter et améliorer nos services.</li>
              <li>Personnaliser votre expérience utilisateur.</li>
              <li>
                Communiquer avec vous au sujet de mises à jour, offres spéciales et autres informations de marketing.
              </li>
              <li>Assurer la sécurité de notre application et prévenir les fraudes.</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-2">3. Partage de vos informations</h2>
          <p className="mb-4">
            Nous ne partageons vos informations personnelles avec des tiers que dans les cas suivants :
            <ul className="list-disc list-inside ml-4">
              <li>Avec votre consentement explicite.</li>
              <li>Pour se conformer à des obligations légales.</li>
              <li>Avec des prestataires de services qui travaillent en notre nom.</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-2">4. Sécurité de vos informations</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos
            informations personnelles contre la perte, le vol, l&apos;accès non autorisé, la divulgation, la
            modification et la destruction.
          </p>
          <h2 className="text-2xl font-bold mb-2">5. Vos droits</h2>
          <p className="mb-4">
            En tant qu&apos;utilisateur, vous avez le droit d&apos;accéder à vos informations personnelles, de les
            corriger, de demander leur suppression et de vous opposer à leur traitement. Pour exercer ces droits,
            veuillez nous contacter à l&apos;adresse email fournie ci-dessous.
          </p>
          <h2 className="text-2xl font-bold mb-2">6. Modifications de cette politique</h2>
          <p className="mb-4">
            Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de
            toute modification en publiant la nouvelle politique sur cette page.
          </p>
          <h2 className="text-2xl font-bold mb-2">7. Nous contacter</h2>
          <p className="mb-4">
            Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez
            nous contacter à l&apos;adresse email suivante : mehdi.hattou1@gmail.com
          </p>
        </div>
        <FooterCopyrights />
      </motion.div>
    </AuroraBackground>
  );
}
