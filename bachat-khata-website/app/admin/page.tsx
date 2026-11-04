 "use client";
import { useEffect, useState } from "react";
import { supabase, type Member } from "@/lib/supabase";
import { LogOut, Plus, Save, Trash2, UploadCloud } from "lucide-react";

const blank = { name: "", role: "", phone: "", email: "", bio: "", photo_url: "", sort_order: 0 };

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<any>(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadMembers() {
    const { data, error } = await supabase.from("members").select("*").order("sort_order");
    if (error) setNotice(error.message); else setMembers((data ?? []) as Member[]);
  }
  useEffect(() => { if (session) loadMembers(); }, [session]);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setNotice("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setNotice(error ? error.message : "Signed in."); setBusy(false);
  }
  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setNotice("");
    const payload = { ...form, sort_order: Number(form.sort_order || 0) };
    const result = editing
      ? await supabase.from("members").update(payload).eq("id", editing)
      : await supabase.from("members").insert(payload);
    if (result.error) setNotice(result.error.message);
    else { setNotice("Member saved successfully."); setForm(blank); setEditing(null); await loadMembers(); }
    setBusy(false);
  }
  async function uploadPhoto(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setNotice("Please upload a JPG, PNG or WebP image."); return; }
    if (file.size > 3 * 1024 * 1024) { setNotice("Image must be smaller than 3 MB."); return; }
    setBusy(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("member-photos").upload(path, file, { upsert: false });
    if (error) setNotice(error.message);
    else {
      const { data } = supabase.storage.from("member-photos").getPublicUrl(path);
      setForm((f: any) => ({ ...f, photo_url: data.publicUrl }));
      setNotice("Photo uploaded. Save the member to publish it.");
    }
    setBusy(false);
  }
  function edit(m: Member) { setEditing(m.id); setForm({ ...m }); window.scrollTo({ top: 0, behavior: "smooth" }); }
  async function remove(id: string) {
    if (!confirm("Delete this member profile?")) return;
    const { error } = await supabase.from("members").delete().eq("id", id);
    setNotice(error ? error.message : "Member deleted."); await loadMembers();
  }
  if (!session) return <main className="admin-page"><form className="login-card" onSubmit={login}>
    <span className="eyebrow">Website management</span><h1>Admin sign in</h1><p>Sign in with the admin account created in Supabase.</p>
    <label>Email address<input type="email" required value={email} onChange={e => setEmail(e.target.value)}/></label>
    <label>Password<input type="password" required value={password} onChange={e => setPassword(e.target.value)}/></label>
    <button className="button button-primary full" disabled={busy}> {busy ? "Please wait…" : "Sign in"} </button>
    {notice && <p className="notice">{notice}</p>}
  </form></main>;

  return <main className="admin-page"><div className="container admin-wrap">
    <div className="admin-heading"><div><span className="eyebrow">Private dashboard</span><h1>Manage members</h1><p>Add, update or remove the 13 member profiles shown on the website.</p></div><button className="button button-outline" onClick={() => supabase.auth.signOut()}><LogOut size={16}/> Sign out</button></div>
    <form className="admin-form" onSubmit={save}><h2>{editing ? "Edit member" : "Add a member"}</h2>
      <div className="form-grid">
        <label>Full name *<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})}/></label>
        <label>Position / role<input placeholder="e.g. Member, Chairperson" value={form.role || ""} onChange={e => setForm({...form, role:e.target.value})}/></label>
        <label>Phone number<input value={form.phone || ""} onChange={e => setForm({...form, phone:e.target.value})}/></label>
        <label>Email address<input type="email" value={form.email || ""} onChange={e => setForm({...form, email:e.target.value})}/></label>
        <label>Display order<input type="number" value={form.sort_order ?? 0} onChange={e => setForm({...form, sort_order:e.target.value})}/></label>
        <label>Profile photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e => uploadPhoto(e.target.files?.[0])}/></label>
        <label className="span-two">Short introduction<textarea rows={3} value={form.bio || ""} onChange={e => setForm({...form, bio:e.target.value})}/></label>
      </div>
      {form.photo_url && <p className="photo-ready">Photo ready: <a href={form.photo_url} target="_blank">view uploaded image</a></p>}
      <div className="form-actions"><button className="button button-primary" disabled={busy}><Save size={16}/>{busy ? "Saving…" : "Save member"}</button><button type="button" className="button button-outline" onClick={() => {setForm(blank);setEditing(null)}}>Clear form</button></div>
      {notice && <p className="notice">{notice}</p>}
    </form>
    <section className="admin-list"><h2>Current members ({members.length})</h2>{members.map(m => <div className="admin-row" key={m.id}><div><strong>{m.name}</strong><small>{m.email || m.phone || "No contact details added"}</small></div><div className="row-actions"><button onClick={() => edit(m)}>Edit</button><button className="delete-button" onClick={() => remove(m.id)}><Trash2 size={15}/> Delete</button></div></div>)}</section>
  </div></main>;
}
