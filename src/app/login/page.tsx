"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Header } from "@/components/login/header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loading } from "@/components/ui/loading"
import { apiClient } from "@/lib/api/client"
import { useAuthContext } from "@/lib/contexts/auth-context"
import { useAuth } from "@/lib/hooks/use-auth"

export default function LoginPage() {
  const router = useRouter()
  const { setAuth } = useAuthContext()
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})

  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      router.push("/home")
    }
  }, [isAuthLoading, isAuthenticated, router])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    }

    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await apiClient.login({
        email,
        password,
      })

      // si rememberMe es true: el token y nombre de usuario se guarda en local storage
      // si rememberMe es false: el token y nombre de usuario se guarda en sessionStorage
      setAuth(response.data.token, response.data.name, rememberMe)

      setIsLoading(false)
      setIsSuccess(true)

      setTimeout(() => {
        router.push("/home")
      }, 1500)
    } catch (error) {
      setIsLoading(false)

      if (error instanceof Error) {
        setErrors({
          general: error.message || "Error al iniciar sesión",
        })
      } else {
        setErrors({
          general: "Error inesperado. Por favor intenta nuevamente.",
        })
      }
    }
  }

  const animationTimeline = {
    logoIcon: { delay: 0, duration: 0.5 },
    logoContainer: { delay: 0, duration: 0.5 },
    title: { delay: 0.2, duration: 0.4 },
    subtitle: { delay: 0.4, duration: 0.4 },
    form: { delay: 0.6, duration: 0.4 },
    emailField: { delay: 0.6, duration: 0.3 },
    passwordField: { delay: 0.8, duration: 0.3 },
    checkbox: { delay: 1.0, duration: 0.3 },
    button: { delay: 1.2, duration: 0.3 },
  }

  if (isAuthLoading || isAuthenticated) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-daybg flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-[350px] space-y-8">
        <Header animationTimeline={animationTimeline} />

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: animationTimeline.form.duration,
            delay: animationTimeline.form.delay,
            ease: "easeOut",
          }}
          onSubmit={handleSubmit}
          className="space-y-48"
        >
          <div className="space-y-6">
            {/* Email  */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: animationTimeline.emailField.duration,
                delay: animationTimeline.emailField.delay,
                ease: "easeOut",
              }}
            >
              <Label
                htmlFor="email"
                className="text-base font-medium text-gray-900 leading-[22px] font-heading"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }
                }}
                className="text-sm text-gray-500 mt-2 border-gray-100"
                required
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-red-500 mt-1 font-heading"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password  */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: animationTimeline.passwordField.duration,
                delay: animationTimeline.passwordField.delay,
                ease: "easeOut",
              }}
            >
              <div className="space-y-4">
                <Label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900 leading-[24px] font-heading"
                >
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: undefined }))
                    }
                  }}
                  className="text-sm text-gray-500 mt-2 border-gray-100"
                  required
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, x: -10, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-red-500 mt-1 font-heading"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Remember Me */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: animationTimeline.checkbox.duration,
                    delay: animationTimeline.checkbox.delay,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-2.5"
                >
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked)
                    }}
                    className="h-[18px] w-[18px]"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-gray-400 leading-5 cursor-pointer font-heading"
                  >
                    Recordarme
                  </label>
                </motion.div>

                <AnimatePresence>
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3"
                    >
                      <p className="text-sm text-red-600 font-heading text-center">
                        {errors.general}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animationTimeline.button.duration,
              delay: animationTimeline.button.delay,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full bg-paisabank-default hover:bg-paisabank-default/90 text-white font-semibold text-base leading-[22px] font-heading transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Ingresando...
                </span>
              ) : isSuccess ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  ¡Éxito!
                </span>
              ) : (
                "Ingresar"
              )}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}
