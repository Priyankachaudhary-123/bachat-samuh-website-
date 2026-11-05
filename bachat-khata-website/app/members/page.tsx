import { getMembers } from "@/lib/supabase";
import { Mail, Phone, UserRound } from "lucide-react";

export const revalidate = 0;

export default async function MembersPage() {
  const members = await getMembers();
  return <main className="inner-page">
    <section className="page-hero"><div className="container"><span className="eyebrow">Our people</span><h1>Meet our <em>members.</em></h1><p>Every member is an important part of our shared journey.</p></div></section>
     <section className="container members-section">
      {members.length ? <div className="member-grid">{members.map((m) => <article className="member-card" key={m.id}>
        <div className="member-photo">{m.photo_url ? <img src={m.photo_url} alt={m.name}/> : <UserRound size={42}/>}</div>
        {/* <div className="member-info"><h2>{m.name}</h2>{m.role && <span className="member-role">{m.role}</span>}
          {m.bio && <p>{m.bio}</p>}
          {m.phone && <a href={`tel:${m.phone}`}><Phone size={15}/>{m.phone}</a>}
          {m.email && <a href={`mailto:${m.email}`}><Mail size={15}/>{m.email}</a>}
        </div> */}
        <div className="member-info">
  <h2>{m.name}</h2>
  {m.phone && <a href={`tel:${m.phone}`}><Phone size={15}/>{m.phone}</a>}
  {m.email && <a href={`mailto:${m.email}`}><Mail size={15}/>{m.email}</a>}
</div>
      </article>)}</div> : <div className="empty-state"><UserRound size={38}/><h2>Member profiles are being prepared.</h2><p>Please check back soon.</p></div>}
    </section> 
     {/* <section className="container members-section">
        {members.length > 0 ? (
          <div className="member-grid">
            {members.map((member) => (
              <article className="member-card" key={member.id}>
                <div className="member-photo">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                    />
                  ) : (
                    <UserRound size={42} />
                  )}
                </div>

                <div className="member-info">
                  <h2>{member.name}</h2>

                  {member.role && (
                    <span className="member-role">
                      {member.role}
                    </span>
                  )}

                  {member.bio && <p>{member.bio}</p>}

                  {member.phone && (
                    <a href={`tel:${member.phone}`}>
                      <Phone size={15} />
                      {member.phone}
                    </a>
                  )}

                  {member.email && (
                    <a href={`mailto:${member.email}`}>
                      <Mail size={15} />
                      {member.email}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <UserRound size={38} />
            <h2>Member profiles are being prepared.</h2>
            <p>Please check back soon.</p>
          </div>
        )}
      </section> */}
    
  

  </main>;
}
