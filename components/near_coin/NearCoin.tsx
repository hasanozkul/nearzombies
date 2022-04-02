import PasswordReset from './PasswordReset'
import ShowVerification from './ShowVerification'
import ConnectWallet from './ConnectWallet'

export const NearCoin = () => {
  return (
    <div className="sticky  z-50 h-[100vw] w-[90vw] animate-withClipPath md:-mt-16 md:w-[100vw]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-10 flex w-full  flex-col rounded-lg bg-gray-100 p-8 md:ml-auto md:mt-0 md:w-1/2 lg:w-1/4"
      >
        <ShowVerification />
        <ConnectWallet />
        <PasswordReset />
      </div>
    </div>
  )
}
