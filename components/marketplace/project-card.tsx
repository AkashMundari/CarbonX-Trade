import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden">
      <img src={project.image || "/placeholder.svg"} alt={project.name} className="w-full aspect-[4/3] object-cover" />
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-display">{project.name}</CardTitle>
        <div className="text-sm text-muted-foreground">{project.location}</div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{project.methodology}</Badge>
          <Badge className="bg-primary text-primary-foreground hover:opacity-90">${project.price}/t</Badge>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{project.available} tCO₂e available</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button asChild size="sm" className="bg-accent text-accent-foreground hover:opacity-90">
          <Link href={`/projects/${project.id}`}>View</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={`/projects/${project.id}`}>Buy</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
