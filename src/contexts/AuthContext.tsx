import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

type AuthenticateData = {
  email: string;
  password: string;
};

type AuthData = {
  user: User;
  isAuthenticate: boolean;
  register: (data: User) => Promise<void>;
  authenticate: (data: AuthenticateData) => Promise<void>;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const baseUrl = "http://localhost:3000/api";

export const AuthContext = createContext({} as AuthData);

export function AuthProvider({ children }: ThemeProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticate = !!user;

  useEffect(() => {
    console.log("use Eff");
    const token = Cookies.get("to-do-list-token");
    if (token) {
      axios
        .get(`${baseUrl}/getAccess`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then(res => res.data)
        .then(data => {
          setUser({
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            password: data.user.password,
          });
          console.log(user)
        });
    }
  }, []);

  const register = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post(`${baseUrl}/register`, {
        name,
        email,
        password,
      });

      Router.push("/login");
    } catch (error) {
      Router.push("/hasError");
    }
  };

  const authenticate = async (dataUser: AuthenticateData) => {
    try {
      const { data } = await axios.post(`${baseUrl}/authenticate`, {
        email: dataUser.email,
        password: dataUser.password,
      });

      if (data.token) {
        setCookie(data.token);
      }

      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        password: data.user.password,
      });

      Router.push("/");
    } catch (error) {
      Router.push("/login");
    }
  };

  const setCookie = (cookie: string) => {
    const date = new Date();
    date.setTime(date.getTime() + 60 * 1500);
    Cookies.set("to-do-list-token", cookie, { expires: date });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticate, user, register, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
}
