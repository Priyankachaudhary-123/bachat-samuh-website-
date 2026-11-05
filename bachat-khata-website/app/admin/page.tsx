 
"use client";

import { useEffect, useState } from "react";
import { supabase, type Member } from "@/lib/supabase";
import { LogOut, Save, Trash2 } from "lucide-react";

const blank = {
  name: "",
  phone: "",
  email: "",
  photo_url: "",
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("id, name, phone, email, photo_url");

    if (error) {
      setNotice(error.message);
    } else {
      setMembers((data ?? []) as Member[]);
    }
  }

  useEffect(() => {
    if (session) loadMembers();
  }, [session]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setNotice(error ? error.message : "Signed in.");
    setBusy(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice("");

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      photo_url: form.photo_url || null,
    };

    const result = editing
      ? await supabase.from("members").update(payload).eq("id", editing)
      : await supabase.from("members").insert(payload);

    if (result.error) {
      setNotice(result.error.message);
    } else {
      setNotice("Member saved successfully.");
      setForm(blank);
      setEditing(null);
      await loadMembers();
    }

    setBusy(false);
  }

  async function uploadPhoto(file?: File) {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice("Please upload a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setNotice("Image must be smaller than 3 MB.");
      return;
    }

    setBusy(true);
    setNotice("");

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("member-photos")
      .upload(path, file, { upsert: false });

    if (error) {
      setNotice(error.message);
    } else {
      const { data } = supabase.storage
        .from("member-photos")
        .getPublicUrl(path);

      setForm((f) => ({
        ...f,
        photo_url: data.publicUrl,
      }));

      setNotice("Photo uploaded. Now save the member.");
    }

    setBusy(false);
  }

  function edit(member: Member) {
    setEditing(member.id);

    setForm({
      name: member.name || "",
      phone: member.phone || "",
      email: member.email || "",
      photo_url: member.photo_url || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id: string) {
    if (!confirm("Delete this member profile?")) return;

    setBusy(true);

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    setNotice(error ? error.message : "Member deleted.");

    await loadMembers();
    setBusy(false);
  }

  if (!session) {
    return (
      <main className="admin-page">
        <form className="login-card" onSubmit={login}>
          <span className="eyebrow">Website management</span>
          <h1>Admin sign in</h1>
          <p>Sign in with your admin account.</p>

          <label>
            Email address
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="button button-primary full" disabled={busy}>
            {busy ? "Please wait…" : "Sign in"}
          </button>

          {notice && <p className="notice">{notice}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="container admin-wrap">

        <div className="admin-heading">
          <div>
            <span className="eyebrow">Private dashboard</span>
            <h1>Manage Members</h1>
            <p>Add, update or remove member profiles.</p>
          </div>

          <button
            className="button button-outline"
            onClick={() => supabase.auth.signOut()}
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>

        <form className="admin-form" onSubmit={save}>
          <h2>{editing ? "Edit Member" : "Add a Member"}</h2>

          <div className="form-grid">

            <label>
              Full Name *
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </label>

            <label>
              Phone Number
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </label>

            <label>
              Profile Photo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => uploadPhoto(e.target.files?.[0])}
              />
            </label>

          </div>

          {form.photo_url && (
            <p className="photo-ready">
              Photo ready:{" "}
              <a href={form.photo_url} target="_blank" rel="noreferrer">
                View uploaded image
              </a>
            </p>
          )}

          <div className="form-actions">
            <button
              className="button button-primary"
              disabled={busy}
            >
              <Save size={16} />
              {busy ? "Please wait…" : "Save Member"}
            </button>

            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setForm(blank);
                setEditing(null);
                setNotice("");
              }}
            >
              Clear Form
            </button>
          </div>

          {notice && <p className="notice">{notice}</p>}
        </form>

        <section className="admin-list">
          <h2>Current Members ({members.length})</h2>

          {members.map((member) => (
            <div className="admin-row" key={member.id}>
              <div>
                <strong>{member.name}</strong>
                <small>
                  {member.email || member.phone || "No contact details"}
                </small>
              </div>

              <div className="row-actions">
                <button onClick={() => edit(member)}>
                  Edit
                </button>

                <button
                  className="delete-button"
                  disabled={busy}
                  onClick={() => remove(member.id)}
                >
                  <Trash2 size={15} /> Delete
                </button>
              </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
